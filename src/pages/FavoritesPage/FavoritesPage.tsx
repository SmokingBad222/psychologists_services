import { useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import Container from "../../components/Container/Container";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import { psychologists } from "../../data/psychologists";
import type { StoredAuthData } from "../../types/auth";
import { getFavoriteIds, saveFavoriteIds } from "../../utils/favorites";
import css from "./FavoritesPage.module.css"

type OutletContextType = {
    authUser: StoredAuthData | null;
    setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
}

type Review = {
    reviewer: string;
    rating: number;
    comment: string;
};

type Psychologist = {
    id: string;
    name: string;
    avatar_url: string;
    experience: string;
    reviews: Review[];
    price_per_hour: number;
    rating: number;
    license: string;
    specialization: string;
    initial_consultation: string;
    about: string;
};

export default function FavoritesPage() {
    const { authUser } = useOutletContext<OutletContextType>();
    const [favoriteIds, setFavoriteIds] = useState<string[]>(authUser ?
        getFavoriteIds(authUser.userId) : []
    );
    if (!authUser) {
        return <Navigate to="/" replace />
    }

    const typedPsychologists = psychologists as Psychologist[];
    
    const favoritePsychologists = typedPsychologists.filter((psychologists) =>
            favoriteIds.includes(psychologists.id)
        );

    const handleToggleFavorite = (psychologistId: string) => {
        const isAlreadyFavorite = favoriteIds.includes(psychologistId);

        const nextFavoriteIds = isAlreadyFavorite
            ? favoriteIds.filter((id) => id !== psychologistId)
            : [...favoriteIds, psychologistId];
        
        saveFavoriteIds(authUser.userId, nextFavoriteIds);
        setFavoriteIds(nextFavoriteIds);
    };

    return (
        <section className={css.section}>
            <Container>
                <div className={css.top}>
                    <div>
                        <h1 className={css.title}>Favorite</h1>
                        <p className={css.text}>
                            Here you can see psychologists you added to favorites. 
                        </p>
                    </div>
                </div>

                {favoritePsychologists.length === 0 ? (
                    <div className={css.emptyState}>
                        <p className={css.emptyText}>
                            You do not have favorite psychologists yet.
                        </p>

                        <Link to="/psychologists" className={css.link}>
                            Go to psychologists
                        </Link>
                    </div>
                ) : (
                        <PsychologistsList 
                            items={favoritePsychologists}
                            favoriteIds={favoriteIds}
                            onToggleFavorite={handleToggleFavorite}
                        />
                )}
            </Container>
        </section>
    );
}