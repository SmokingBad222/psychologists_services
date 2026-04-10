import { useOutletContext } from "react-router-dom";
import Container from "../../components/Container/Container";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import css from "./HomePage.module.css";
import type { StoredAuthData } from "../../types/auth";

type OutletContextType = {
  authUser: StoredAuthData | null;
  setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
};

export default function HomePage() {
    const { authUser, setAuthUser } = useOutletContext<OutletContextType>();
    
    return (
        <section className={ css.hero}>
            <Container>
                <div className={css.wrapper}>
                    <div className={ css.content}>
                        <p className={css.label}>Psychologists Services</p>
                        
                        <h1 className={css.title}>
                            The road to the <span className={css.accent}>depths</span> of the human soul
                        </h1>

                        <p className={css.text}>
                            We help you find a specialist for support, growth, balance and meaningful change in life.
                        </p>

                        <a href="/psychologists" className={css.link}>Get started
                        </a>
                    </div>

                    <div className={css.visual}>
                        <div className={css.card}> Future image / visual block</div>
                    </div>
                </div>

                <AuthPanel authUser={authUser} setAuthUser={setAuthUser} onClose={()=>{}}/>
            </Container>
        </section>
    );
}