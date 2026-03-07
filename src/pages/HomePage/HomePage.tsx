import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import css from "./HomePage.module.css";

export default function HomePage() {
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

                        <Link to="/psychologists" className={css.link}>Get started
                        </Link>
                    </div>

                    <div className={css.visual}>
                        <div className={css.card}> Future image / visual block</div>
                    </div>
                </div>
            </Container>
        </section>
    );
}