import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { getAuthData } from "./utils/authStorage";
import type { StoredAuthData } from "./types/auth";

export default function App() {
    const [authUser, setAuthUser] = useState<StoredAuthData | null>(getAuthData());

    return (
        <>
            <Header authUser={authUser} setAuthUser={setAuthUser} />
            <main>
                <Outlet context={{ authUser, setAuthUser }} />
            </main>
        </>
    );
}