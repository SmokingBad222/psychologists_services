import { Outlet } from "react-router-dom";
import type { StoredAuthData } from "../../types/auth";
import Header from "../Header/Header";
import css from "./Layout.module.css";

interface LayoutProps {
    authUser: StoredAuthData | null;
    setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
}

export default function Layout({authUser, setAuthUser}: LayoutProps) {
    return (
        <div className={css.layout}>
            <Header authUser={authUser} setAuthUser={setAuthUser} />
            <main className={css.main}>
                <Outlet />
            </main>
        </div>
    );
}