import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import type { StoredAuthData } from "../../types/auth";
import AuthPanel from "../AuthPanel/AuthPanel";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import css from "./Header.module.css";

interface HeaderProps {
  authUser: StoredAuthData | null;
  setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
}

export default function Header({ authUser, setAuthUser }: HeaderProps) {
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openLoginPanel = () => {
    setAuthMode("login");
    setIsAuthPanelOpen(true);
  };

  const openRegisterPanel = () => {
    setAuthMode("register");
    setIsAuthPanelOpen(true);
  };

  const closeAuthPanel = () => {
    setIsAuthPanelOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    setAuthUser(null);
  };

  const userDisplayName =
    authUser?.name?.trim() || authUser?.email?.split("@")[0] || "User";

  return (
    <>
      <header className={css.header}>
        <Container>
          <div className={css.inner}>
            <Link to="/" className={css.logo}>
              psychologists<span className={css.accent}>.services</span>
            </Link>

            <Navigation authUser={authUser} />

            <div className={css.rightSide}>
              {authUser ? (
                <>
                  <div className={css.userBlock}>
                    <div className={css.userIcon} aria-hidden="true">
                      <img
                        className={css.userSvg}
                        src="/icons/user.svg"
                        alt=""
                        aria-hidden="true"
                      />
                    </div>

                    <span className={css.userName}>{userDisplayName}</span>
                  </div>

                  <button
                    type="button"
                    className={css.logoutButton}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={css.authButton}
                    onClick={openLoginPanel}
                  >
                    Log In
                  </button>

                  <button
                    type="button"
                    className={css.primaryButton}
                    onClick={openRegisterPanel}
                  >
                    Registration
                  </button>
                </>
              )}
            </div>
          </div>
        </Container>
      </header>

      {isAuthPanelOpen && !authUser && (
        <AuthPanel
          authUser={authUser}
          setAuthUser={setAuthUser}
          onClose={closeAuthPanel}
          mode={authMode}
        />
      )}
    </>
  );
}