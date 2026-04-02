import { useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../../api/auth";
import { getAuthData } from "../../utils/authStorage";
import type { StoredAuthData } from "../../types/auth";

export default function AuthPanel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authUser, setAuthUser] = useState<StoredAuthData | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const savedAuthData = getAuthData();
        setAuthUser(savedAuthData);
    }, []);

    const handleRegister = async () => {
        try {
            setError("");
            setIsLoading(true);

            const data = await registerUser(email, password);
            setAuthUser(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Register failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        try {
            setError("");
            setIsLoading(true);

            const data = await loginUser(email, password);
            setAuthUser(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Login failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        logoutUser();
        setAuthUser(null);
    };


    return (
        <section>
            <h2>Auth test panel</h2>

            <input type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <input type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <div>
                <button type="button" onClick={handleRegister} disabled={isLoading}>Register</button>
                <button type="button" onClick={handleLogin} disabled={isLoading}>Login</button>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>

            {isLoading && <p>Loading...</p>}

            {error && <p>{error}</p>}
            
            {authUser && (
                <div>
                    <p>User is loged in</p>
                    <p>Email: {authUser.email}</p>
                    <p>User ID: { authUser.userId}</p>
                </div>
            )}
        </section>
    )

}