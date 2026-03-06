import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import css from "./Layout.module.css";

export default function Layout() {
    return (
        <div className={css.layout}>
            <Header />
            <main className={css.main}>
                <Outlet />
            </main>
        </div>
    );
}