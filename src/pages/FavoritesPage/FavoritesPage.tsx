import { Link, Navigate, useOutletContext } from "react-router-dom";
import Container from "../../components/Container/Container";
import type { StoredAuthData } from "../../types/auth";

type OutletContextType = {
    authUser: StoredAuthData | null;
    setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
}

export default function FavoritesPage() {
    const { authUser } = useOutletContext<OutletContextType>();

    if (!authUser) {
        return <Navigate to="/" replace />
    }

    return (
        <Container>
            <section>
                <h1>Favorites</h1>
                <p>Authorized user: { authUser.email}</p>
                <p>Your favorite psychologists will be here.</p>

                <Link to="/psychologists">Go to psychologists</Link>
            </section>
        </Container>
    );
}