import { NavLink } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import type { StoredAuthData } from "../../types/auth";
import css from "./Navigation.module.css";

interface NavigationProps {
  authUser: StoredAuthData | null;
  setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
  onOpenAuthPanel: () => void;
}

export default function Navigation({
    authUser, setAuthUser, onOpenAuthPanel }: NavigationProps) {
    const isLoggedIn = Boolean(authUser);

  const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${css.link} ${css.active}` : css.link;
  };

  const handleLogout = () => {
    logoutUser();
    setAuthUser(null);
  };
    
    return (
        <nav className={css.nav}>

          <NavLink to='/' className={buildLinkClass}>Home</NavLink>

          <NavLink to='/psychologists' className={buildLinkClass}>Psychologists</NavLink>

          <NavLink to='/favorites' className={buildLinkClass}>Favorites</NavLink>

          {isLoggedIn ? (<button type="button" className={css.authButton} onClick={handleLogout}>Logout</button>
          ) : (
          <button type="button" className={css.authButton} onClick={onOpenAuthPanel}>Login</button>)}
        </nav>
    );
}