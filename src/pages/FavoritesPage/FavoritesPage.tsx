import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import Container from "../../components/Container/Container";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import { fetchPsychologistsFromFirebase } from "../../api/psychologists";
import type { StoredAuthData } from "../../types/auth";
import { getFavoriteIds, saveFavoriteIds } from "../../utils/favorites";
import css from "./FavoritesPage.module.css"
import type { Psychologist } from "../../types/psychologist";

type OutletContextType = {
    authUser: StoredAuthData | null;
    setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
}


export default function FavoritesPage() {
    const { authUser } = useOutletContext<OutletContextType>();
    const [favoriteVersion, setFavoriteVersion] = useState(0);
    const [items, setItems] = useState<Psychologist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const userId = authUser?.userId ?? "";

    const favoriteIds = useMemo(() => {
        if(!authUser) {
            return [];
        }

        return getFavoriteIds(userId);
    }, [userId, favoriteVersion, authUser]);

    useEffect(() => {
        const loadPsychologists = async () => {
            try {
                setIsLoading(true);
                setError("");

                const data = await fetchPsychologistsFromFirebase();
                setItems(data);
            } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load favorite psychologists.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPsychologists();
    }, []);
    

    const favoritePsychologists = useMemo(() => {
        return items.filter((psychologist) => favoriteIds.includes(psychologist.id));
    }, [items, favoriteIds]);


    if (!authUser) {
        return <Navigate to="/" replace />
    }

    const handleToggleFavorite = (psychologistId: string) => {
        const isAlreadyFavorite = favoriteIds.includes(psychologistId);

        const nextFavoriteIds = isAlreadyFavorite
            ? favoriteIds.filter((id) => id !== psychologistId)
            : [...favoriteIds, psychologistId];
        
        saveFavoriteIds(authUser.userId, nextFavoriteIds);
        setFavoriteVersion((prev) => prev + 1);
    };

    return (
        <section className={css.section}>
            <Container>
                <div className={css.top}>
                    <div>
                        <h1 className={css.title}>Favorites</h1>
                        <p className={css.text}>
                            Here you can see psychologists you added to favorites. 
                        </p>
                    </div>
                </div>

                {isLoading && <p className={css.status}>Loading favorite psychologists...</p>}
                
                {error && <p className={css.error}>{ error}</p> }

                {!isLoading && !error && favoritePsychologists.length === 0 ? (
                    <div className={css.emptyState}>
                        <p className={css.emptyText}>
                            You do not have favorite psychologists yet.
                        </p>

                        <Link to="/psychologists" className={css.link}>
                            Go to psychologists
                        </Link>
                    </div>
                ) : null}
                        {!isLoading && !error &&favoritePsychologists.length > 0 && (<PsychologistsList 
                            items={favoritePsychologists}
                            favoriteIds={favoriteIds}
                            onToggleFavorite={handleToggleFavorite}
                        />
                        )}
            </Container>
        </section>
    );
}