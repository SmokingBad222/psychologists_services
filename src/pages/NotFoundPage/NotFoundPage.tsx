import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";

export default function NotFoundPage() {
    return (
        <Container>
            <section>
                <h1>404</h1>
                <p>Page not found</p>
                <Link to='/'>Go home</Link>
            </section>
        </Container>
    );
}