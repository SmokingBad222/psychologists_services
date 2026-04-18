import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "../../components/Container/Container";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import { psychologists } from "../../data/psychologists";
import css from "./PsychologistsPage.module.css";
import { sortPsychologists } from "../../utils/sortPsychologists";
import type { SortOption } from "../../types/psychologist";
import { getFavoriteIds, saveFavoriteIds } from "../../utils/favorites";
import type { StoredAuthData } from "../../types/auth";

type OutletContextType = {
  authUser: StoredAuthData | null;
  setAuthUser: React.Dispatch<React.SetStateAction<StoredAuthData | null>>;
};

export default function PsychologistsPage() {
  const { authUser } = useOutletContext<OutletContextType>();

  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const [visibleCount, setVisibleCount] = useState(3);
  const [authMessage, setAuthMessage] = useState("");

  const [favoritesVersion, setFavoritesVersion] = useState(0);

  const userId = authUser?.userId ?? "";

  const favoriteIds = useMemo(() => {
    if (!userId) {
      return [];
    }

    return getFavoriteIds(userId);
  }, [userId, favoritesVersion]);

  const sortedPsychologists = sortPsychologists(psychologists, sortOption);
  const visiblePsychologists = sortedPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPsychologists.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleToggleFavorite = (psychologistId: string) => {
    if (!authUser) {
      setAuthMessage("This feature is available only for authorized users.");
      return;
    }

    setAuthMessage("");

    const isAlreadyFavorite = favoriteIds.includes(psychologistId);

    const nextFavoriteIds = isAlreadyFavorite
      ? favoriteIds.filter((id) => id !== psychologistId)
      : [...favoriteIds, psychologistId];

    saveFavoriteIds(authUser.userId, nextFavoriteIds);

    setFavoritesVersion((prev) => prev + 1);
  };

  return (
    <section className={css.section}>
      <Container>
        <div className={css.top}>
          <div>
            <h1 className={css.title}>Psychologists</h1>
            <p className={css.text}>
              Choose a specialist who matches your needs and goals.
            </p>
          </div>

          <div className={css.controls}>
            <label className={css.label} htmlFor="sort">
              Sort by
            </label>

            <select
              id="sort"
              className={css.select}
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value as SortOption)
              }
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

        {authMessage && <p className={css.authMessage}>{authMessage}</p>}

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