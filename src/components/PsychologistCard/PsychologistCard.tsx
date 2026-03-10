import type { Psychologist } from "../../types/psychologist";
import css from "./PsychologistCard.module.css";

interface PsychologistCardProps {
    psychologist: Psychologist;
}

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const {
    name,
    avatar_url,
    experience,
    price_per_hour,
    rating,
    specialization,
    initial_consultation,
    about,
    } = psychologist;
    
    return (
        <article className={css.card}>
            <div className={css.top}>
                <img className={css.avatar} src={avatar_url} alt={name} />
                <div className={css.meta}>
                    <p className={css.label}>Psychologist</p>
                    <h2 className={css.name}>{name}</h2>
                </div>
            </div>

            <ul className={css.infoList}>
                <li className={css.infoItem}>
                    <span className={css.infoLabel}>Experience:</span> {experience}
                </li>

                <li className={css.infoItem}>
                    <span className={css.infoLabel}>Specialization:</span> {specialization}
                </li>

                <li className={css.infoItem}>
                    <span className={css.infoLabel}>Initial consultation:</span> {initial_consultation}
                </li>

                <li className={css.infoItem}>
                    <span className={css.infoLabel}>Rating:</span> {rating}
                </li>

                <li className={css.infoItem}>
                    <span className={css.infoLabel}>Price / hour:</span> {price_per_hour} UAH
                </li>
            </ul>

            <p className={css.about}>{about}</p>
            
            <div className={css.actions}>
                <button type="button" className={css.button}>Read more</button>

                <button type="button" className={css.buttonSecondary}>Add to favorites</button>
            </div>
        </article>
    );
}
