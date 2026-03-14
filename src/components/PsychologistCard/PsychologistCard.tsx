import { useState } from "react";
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
    license,
    reviews,
    } = psychologist;
    
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggleDetails = () => {
        setIsExpanded((prev) => !prev);
    };

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
            

             {isExpanded && (
                <div className={css.details}>
                    <p className={css.license}>
                    <span className={css.infoLabel}>License:</span> {license}
                    </p>

                    <div className={css.reviewsBlock}>
                        <h3 className={css.reviewsTitle}>Reviews</h3>

                        <ul className={css.reviewsList}>
                                {reviews.map((review, index) => (
                                <li key={`${review.reviewer}-${index}`} className={css.reviewItem}>
                                    <p className={css.reviewAuthor}>
                                    {review.reviewer} <span>• {review.rating}</span>
                                    </p>
                                    <p className={css.reviewComment}>{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className={css.actions}>
                <button type="button" className={css.button} onClick={handleToggleDetails}>
                    {isExpanded ? "Show less" : "Read more"}
                </button>

                <button type="button" className={css.buttonSecondary}>Add to favorites</button>
            </div>
        </article>
    );
}
