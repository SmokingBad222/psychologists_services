import { useState } from "react";
import Container from "../../components/Container/Container";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import { psychologists } from "../../data/psychologists";
import css from "./PsychologistsPage.module.css";
import { sortPsychologists } from "../../utils/sortPsychologists";
import type { SortOption } from "../../types/psychologist";
import { getFavoriteIds, saveFavoriteIds } from "../../utils/favorites";


export default function PsychologistsPage() {
    const [sortOption, setSortOption] = useState<SortOption>("name-asc");
    const [visibleCount, setvisibleCount] = useState(3);
    const [favoriteIds, setFavoriteIds] = useState<string[]>(getFavoriteIds);


    const sortedPsychologists = sortPsychologists(psychologists, sortOption)
    const visiblePsychologists = sortedPsychologists.slice(0, visibleCount);

    const hasMore = visibleCount < sortedPsychologists.length;

    const handleLoadMore = () => {
        setvisibleCount((prev) => prev + 3);
    };

    const handleToggleFavorite = (psychologistId: string) => {
        setFavoriteIds((prev) => {
        const isFavorite = prev.includes(psychologistId);

        const nextFavoriteIds = isFavorite
            ? prev.filter((id) => id !== psychologistId)
            : [...prev, psychologistId];

        saveFavoriteIds(nextFavoriteIds);

        return nextFavoriteIds;
        });
    };


    return (
        <section className={css.section}>
            <Container>

               <div className={css.top}>
                    <div>
                        <h1 className={css.title}>Psychologists</h1>
                        <p className={css.text}>Choose a specialist who matches your needs and goals.</p>
                    </div>
                
                
                <div className={css.controls}>
                    <label className={css.label} htmlFor="sort">Sort by</label>
              

                <select
                    id="sort"
                    className={css.select}
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value as SortOption)}
                >
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="price-asc">Price low to high</option>
                    <option value="price-desc">Price high to low</option>
                    <option value="rating-asc">Rating low to high</option>
                    <option value="rating-desc">Rating high to low</option>
                </select>
                </div>
              </div>
                <PsychologistsList
                    items={visiblePsychologists}
                    favoriteIds={favoriteIds}
                    onToggleFavorite={handleToggleFavorite}
                />

                
                {hasMore && (
                    <div className={css.loadMoreWrapper}>
                        <LoadMoreButton onClick={handleLoadMore} />
                    </div>
                )}
            </Container>
        </section>     
    );
}