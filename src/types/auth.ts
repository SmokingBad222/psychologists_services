export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export interface StoredAuthData {
    token: string;
    userId: string;
    email: string;
}