import { Link, Navigate, useOutletContext } from "react-router-dom";
import Container from "../../components/Container/Container";
import type { StoredAuthData } from "../../types/auth";
import { getFavoriteIds } from "../../utils/favorites";
import { psychologists } from "../../data/psychologists";

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

    if (!authUser) {
        return <Navigate to="/" replace />
    }

    const favoriteIds = getFavoriteIds(authUser.userId);
    const typedPsychologists = psychologists as Psychologist[];
    
    const favoritePsychologists = typedPsychologists.filter((psychologists) =>
            favoriteIds.includes(psychologists.id)
        );

    

    return (
        <section>
            <Container>
                <h1>Favorites</h1>
                <p>Authorized user: { authUser.email}</p>
                
                {favoritePsychologists.length === 0 ? (
                    <div>
                        <p>You do not have favorite psychologists yet.</p>
                        <Link to="/psychologists">Go to psychologists</Link>
                    </div>
                ) : (
                        <ul>
                            {favoritePsychologists.map((psychologists) => (
                                <li key={psychologists.id}>
                                    <article>
                                        <img
                                        src={psychologists.avatar_url}
                                            alt={psychologists.name}
                                            width="96"
                                            height="96"
                                        />

                                        <h2>{psychologists.name}</h2>
                                        
                                        <p>
                                            <strong>Experience:</strong> {psychologists.experience}
                                        </p>

                                        <p>
                                            <strong>Specialization:</strong>{psychologists.specialization}
                                        </p>

                                        <p>
                                            <strong>Rating:</strong> {psychologists.rating}
                                        </p>

                                        <p>
                                            <strong>Price per hour:</strong>{psychologists.price_per_hour}
                                        </p>

                                        <p>
                                            <strong>Initial consultation:</strong>{" "} {psychologists.initial_consultation}
                                        </p>

                                        <p>{ psychologists.about}</p>
                                    </article>
                                </li>
                            ))}
                        </ul>
                )}
            </Container>
        </section>
    );
}