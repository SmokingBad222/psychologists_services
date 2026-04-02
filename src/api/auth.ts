import type { AuthResponse, StoredAuthData } from "../types/auth";
import { clearAuthData, saveAuthData } from "../utils/authStorage";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
console.log("API_KEY: ", API_KEY);


async function requestAuth(
    endpoint: "signUp" | "signWithPassword",
    email: string,
    password: string
): Promise<AuthResponse> {
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
        const message = data?.error?.message || "Authentication request failed";
        throw new Error(message);
    }

    return data as AuthResponse;
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
    const data = await requestAuth("signWithPassword", email, password);
    const authData = buildStoredAuthData(data);
    saveAuthData(authData);
    return authData;
}

export function logoutUser() {
    clearAuthData();
}