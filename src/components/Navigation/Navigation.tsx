import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { logoutUser } from "../../api/auth";
import { getAuthData } from "../../utils/authStorage";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(css.link, isActive && css.active);

const authData = getAuthData();
const isLoggedIn = Boolean(authData);

const handleLogout = () => {
    logoutUser();
    window.location.reload();
};

export default function Navigation() {
    return (


        <nav className={css.nav}>

            <NavLink to='/' className={buildLinkClass}>Home</NavLink>

            <NavLink to='/psychologists' className={buildLinkClass}>Psychologists</NavLink>

            <NavLink to='/favorites' className={buildLinkClass}>Favorites</NavLink>

            {isLoggedIn ? (<button type="button" className={css.authButton} onClick={handleLogout}>Logout</button>) : ( <button type="button" className={css.authButton}>Login</button>)}
        </nav>
    );
}