import { NavLink } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import type { StoredAuthData } from "../../types/auth";
import css from "./Navigation.module.css";

interface NavigationProps {
  authUser: StoredAuthData | null;
  setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
  onOpenLoginPanel: () => void;
  onOpenRegisterPanel: () => void;
}

export default function Navigation({
  authUser,
  setAuthUser,
  onOpenLoginPanel,
  onOpenRegisterPanel,
}: NavigationProps) {
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

        <div className={ css.links}>
          <NavLink to='/' className={buildLinkClass}>
            Home
          </NavLink>
  
          <NavLink to='/psychologists' className={buildLinkClass}>
            Psychologists
          </NavLink>
  
          {isLoggedIn && (
            <NavLink to='/favorites' className={buildLinkClass}>
            Favorites
            </NavLink>
          )}
        </div>

        <div className={ css.actions}>
          {isLoggedIn ? (
            <button
              type="button"
              className={css.authButton}
              onClick={handleLogout}
            >
              Logout
            </button>
            ) : (
            <>
              <button
                type="button"
                className={css.authButton}
                onClick={onOpenLoginPanel}
              >
                Log In
              </button>
                
                <button
                  type="button"
                  className={css.primaryButton}
                  onClick={onOpenRegisterPanel}
                >
                Registration
              </button>
            </>
          )}
          </div>
        </nav>
    );
}