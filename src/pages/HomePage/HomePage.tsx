import { Link, useOutletContext } from "react-router-dom";
import Container from "../../components/Container/Container";
import css from "./HomePage.module.css";
import type { StoredAuthData } from "../../types/auth";

type OutletContextType = {
  authUser: StoredAuthData | null;
  setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
};

export default function HomePage() {     useOutletContext<OutletContextType>();

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
                            <img
                                className={css.linkArrow}
                                src="/icons/arrow-up-right.svg"
                                alt=""
                                aria-hidden="true"
                            />
                        </Link>
                    </div>

                    <div className={css.visual}>
                        <div className={css.imageWrap}>
                        <img
                            className={css.heroImage}
                            src="/images/hero-psychologist.png"
                            alt="Psychologist during a consultation"
                        />

                        <div className={css.badge}>
                                <div className={css.badgeIcon}>
                                    <img
                                        className={css.checkSvg}
                                        src="/icons/check.svg"
                                        alt=""
                                        aria-hidden="true"
                                    />
                            </div>
                            <div className={css.badgeText}>
                                <p className={css.badgeLabel}>Experienced psychologists</p>
                                <p className={ css.badgeNumber}>15,000</p>
                            </div>
                        </div>

                            <div className={css.questionMark}>
                                <img 
                                    className={css.questionIcon}
                                    src="/icons/question.svg"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </div>
                            

                            <div className={css.userIcon}>
                                <img
                                    className={css.userSvg}
                                    src="/icons/users.svg"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </div>
                            
                    </div>
                    </div>
                    </div>
            </Container>
        </section>
    );
}