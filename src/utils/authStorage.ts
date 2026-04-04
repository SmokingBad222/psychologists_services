import type { StoredAuthData } from "../types/auth";

const AUTH_STORAGE_KEY = "auth-data";

export function getAuthData(): StoredAuthData | null {
    const savedData = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!savedData) {
        return null;
    }

    try {
        return JSON.parse(savedData) as StoredAuthData;
    } catch {
        return null;
    }
} 

export function saveAuthData(data: StoredAuthData): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
}

export function clearAuthData(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
    return Boolean(getAuthData());
}