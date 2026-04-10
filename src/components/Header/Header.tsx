import { useState } from "react";
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
        <header className={css.header}>
            <Container>
                <div className={css.inner}>
                    <a href="/" className={css.logo}>
                        psychologists<span className={css.accent}>.services</span>
                    </a>
                    <Navigation authUser={authUser} setAuthUser={ setAuthUser} onOpenAuthPanel={openAuthPanel}/>
                </div>

                {isAuthPanelOpen && !authUser && (
                    <AuthPanel
                        authUser={authUser}
                        setAuthUser={setAuthUser}
                        onClose={closeAuthPanel}
                    />
                )}
            </Container>
        </header>
    );
}