import Container from "../../components/Container/Container";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import { psychologists } from "../../data/psychologists";
import css from "./PsychologistsPage.module.css";


export default function PsychologistsPage() {
    const visiblePsychologists = psychologists.slice(0.3);

    return (
        <section className={css.section}>
            <Container>

               <div className={css.top}>
                    <h1 className={css.title}>Psychologists</h1>
                    <p className={css.text}>Choose a specialist who matches your needs and goals.</p>
                </div>
                
                <PsychologistsList items={visiblePsychologists} /> 
            </Container>
        </section>     
    );
}