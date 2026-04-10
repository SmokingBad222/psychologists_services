import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import PsychologistsPage from "../pages/PsychologistsPage/PsychologistsPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "psychologists",
                element: <PsychologistsPage />
            },
            {
                path: "favorites",
                element: <FavoritesPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            },
        ],
    },
]);