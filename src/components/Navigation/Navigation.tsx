import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(css.link, isActive && css.active);

export default function Navigation() {
    return (
        <nav className={css.nav}>
            <NavLink to='/' className={buildLinkClass}>Home</NavLink>

            <NavLink to='/psychologists' className={buildLinkClass}>Psychologists</NavLink>

            <NavLink to='/favorites' className={buildLinkClass}>Favorites</NavLink>
        </nav>
    );
}