import Container from "../../components/Container/Container";
import { getAuthData } from "../../utils/authStorage";


export default function FavoritesPage() {

    const authData = getAuthData();

    if (!authData) {
        return (
            <section>
                <Container>
                    <h1>Favorites</h1>
                    <p>This page available only for authorized users</p>
                </Container>
            </section>
        );
    }

    return (
        <Container>
            <section>
                <h1>Favorites</h1>
                <p>Authorized user: { authData.email}</p>
                <p>Your favorite psychologists will be here.</p>
            </section>
        </Container>
    );
}