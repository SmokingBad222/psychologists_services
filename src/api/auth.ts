import type { AuthResponse, StoredAuthData } from "../types/auth";
import { clearAuthData, saveAuthData } from "../utils/authStorage";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

function mapFirebaseError(message: string): string {
    switch (message) {
        case "EMAIL_EXISTS":
            return "User with this email already exists.";
        case "INVALID_LOGIN_CREDENTIALS":
            return "Invalid email or password.";
        case "EMAIL_NOT_FOUND":
            return "User with this email was not found.";
        case "INVALID_PASSWORD":
            return "Invalid email or password.";
        case "USER_DISABLED":
            return "This user account hac been disabled.";
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
            return "Too many attempts. Please try again later."
        default:
            return "Authentication failed. Please try again.";
    }
}

async function requestAuth(
    endpoint: "signUp" | "signInWithPassword",
    email: string,
    password: string
): Promise<AuthResponse> {
    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            const firebaseMessage = data?.error?.message || "Authentication request failed";
            throw new Error(mapFirebaseError(firebaseMessage));
        }

        return data as AuthResponse;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error("Network error. Please try again.");
        }

        if (error instanceof TypeError) {
            throw error;
        }
        throw new Error("Something went wrong. Please try again.");
    }
}

function buildStoredAuthData(data: AuthResponse
): StoredAuthData {
    return {
        token: data.idToken,
        userId: data.localId,
        email: data.email,
    };
}

export async function registerUser(email: string, password: string) {
    const data = await requestAuth("signUp", email, password);
    const authData = buildStoredAuthData(data);
    saveAuthData(authData);
    return authData;
}

export async function loginUser(email: string, password: string) {
    const data = await requestAuth("signInWithPassword", email, password);
    const authData = buildStoredAuthData(data);
    saveAuthData(authData);
    return authData;
}

export function logoutUser() {
    clearAuthData();
}