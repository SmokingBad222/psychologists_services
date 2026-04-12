import { useState } from "react";
import { Link } from "react-router-dom";
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

  const openAuthPanel = () => {
    setIsAuthPanelOpen(true);
  };

  const closeAuthPanel = () => {
    setIsAuthPanelOpen(false);
  };

  return (
    <>
      <header className={css.header}>
        <Container>
          <div className={css.inner}>
            <Link to="/" className={css.logo}>
              psychologists<span className={css.accent}>.services</span>
            </Link>

            <Navigation
              authUser={authUser}
              setAuthUser={setAuthUser}
              onOpenAuthPanel={openAuthPanel}
            />
          </div>
        </Container>
      </header>

      {isAuthPanelOpen && !authUser && (
        <AuthPanel
          authUser={authUser}
          setAuthUser={setAuthUser}
          onClose={closeAuthPanel}
        />
      )}
    </>
  );
}