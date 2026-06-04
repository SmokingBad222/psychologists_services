import { NavLink } from "react-router-dom";
import type { StoredAuthData } from "../../types/auth";
import css from "./Navigation.module.css";

interface NavigationProps {
  authUser: StoredAuthData | null;
}

export default function Navigation({ authUser }: NavigationProps) {
  const isLoggedIn = Boolean(authUser);

  const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${css.link} ${css.active}` : css.link;
  };

  return (
    <nav className={css.nav}>
      <div className={css.links}>
        <NavLink to="/" className={buildLinkClass}>
          {({ isActive }) => (
            <span className={css.linkInner}>
              <span>Home</span>
              <span className={isActive ? `${css.dot} ${css.dotActive}` : css.dot} />
            </span>
          )}
        </NavLink>

        <NavLink to="/psychologists" className={buildLinkClass}>
          {({ isActive }) => (
            <span className={css.linkInner}>
              <span>Psychologists</span>
              <span className={isActive ? `${css.dot} ${css.dotActive}` : css.dot} />
            </span>
          )}
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/favorites" className={buildLinkClass}>
            {({ isActive }) => (
              <span className={css.linkInner}>
                <span>Favorites</span>
                <span className={isActive ? `${css.dot} ${css.dotActive}` : css.dot} />
              </span>
            )}
          </NavLink>
        )}
      </div>
    </nav>
  );
}