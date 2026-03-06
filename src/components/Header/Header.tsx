import { Link } from "react-router-dom";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import css from "./Header.module.css";

export default function Header() {
    return (
        <header className={css.header}>
            <Container>
                <div className={css.inner}>
                    <Link to="/" className={css.logo}>
                        psychologists<span className={css.accent}>.services</span>
                    </Link>
                    <Navigation />
                </div>
            </Container>
        </header>
    );
}