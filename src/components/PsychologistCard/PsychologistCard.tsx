import { useState } from "react";
import type { Psychologist } from "../../types/psychologist";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import css from "./PsychologistCard.module.css";

interface PsychologistCardProps {
    psychologist: Psychologist;
    isFavorite: boolean;
    onToggleFavorite: (psychologistId: string) => void;
}

export default function PsychologistCard({
    psychologist,
    isFavorite,
    onToggleFavorite,
}: PsychologistCardProps) {
    const {
    id,
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
    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

    const handleToggleDetails = () => {
        setIsExpanded((prev) => !prev);
    };

    const openAppointmentModal = () => {
        setIsAppointmentOpen(true);
    };

    const closeAppointmentModal = () => {
        setIsAppointmentOpen(false);
    }

    return (
        <>
            <article className={ css.card}>
                <div className={css.avatarWrap}>
                    <img className={css.avatar} src={avatar_url} alt={name} />
                    <span className={ css.avatarDot}></span>
                </div>
    
                <div className={css.main}>
                    <div className={ css.headerRow}>
                        <div className={css.meta}>
                            <p className={css.label}>Psychologist</p>
                            <h2 className={css.name}>{ name}</h2>
                        </div>
    
                        <div className={ css.sideInfo}>
                            <p className={css.rating}>★ Rating: {rating}</p>
                            <span className={css.divider}></span>
                            <p className={css.price}>
                                Price / 1 hour: <span className={css.priceValue}>{ price_per_hour}$</span>
                            </p>
    
                            <button
                                type="button"
                                className={css.heartButton}
                                onClick={() => onToggleFavorite(id)}
                                aria-label={
                                    isFavorite
                                        ? "Remove psychologist from favorites"
                                        : "Add psychologist to favorites"
                                }
                            >
                                {isFavorite ? "♥" : "♡"}
                            </button>
                        </div>
                    </div>
        
                    <ul className={css.infoList}>
                        <li className={css.infoItem}>
                            <span className={css.infoLabel}>Experience:</span>{" "}
                            {experience}
                        </li>
                    
                        <li className={css.infoItem}>
                            <span className={css.infoLabel}>License:</span>{" "}
                            {license}
                        </li>
        
                        <li className={css.infoItem}>
                            <span className={css.infoLabel}>Specialization:</span>{" "}
                            {specialization}
                        </li>
        
                        <li className={css.infoItem}>
                            <span className={css.infoLabel}>Initial consultation:</span>{" "}
                            {initial_consultation}
                        </li>
                    </ul>
        
                    <p className={css.about}>{about}</p>
                </div>
        
                     {isExpanded && (
                        <div className={css.details}>
        
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
        
                            <button
                                type="button"
                                className={css.button}
                                onClick={openAppointmentModal}
                            >
                                Make an appointment
                            </button>
                        </div>
                    )}
        
                    <div className={css.actions}>
                    <button
                        type="button"
                        className={css.readMoreButton}
                        onClick={handleToggleDetails}>
                            {isExpanded ? "Show less" : "Read more"}
                        </button>
                    </div>
            </article>
                        
            {isAppointmentOpen && (
                <AppointmentModal
                    psychologist={psychologist}
                    onClose={closeAppointmentModal}
                />
            )}
        </>
    );
}
