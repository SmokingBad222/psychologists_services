import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "../../components/Container/Container";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import css from "./PsychologistsPage.module.css";
import { sortPsychologists } from "../../utils/sortPsychologists";
import type { Psychologist, SortOption } from "../../types/psychologist";
import { getFavoriteIds, saveFavoriteIds } from "../../utils/favorites";
import type { StoredAuthData } from "../../types/auth";
import { fetchPsychologistsFromFirebase } from "../../api/psychologists";

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

  const [items, setItems] = useState<Psychologist[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = authUser?.userId ?? "";

  const favoriteIds = useMemo(() => {
    if (!userId) {
      return [];
    }

    return getFavoriteIds(userId);
  }, [userId, favoritesVersion]);

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
          setError("Failed to load psychologists.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPsychologists();
  }, []);

  const sortedPsychologists = sortPsychologists(items, sortOption);
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

        {isLoading && <p className={css.status}>Loading psychologists...</p>}

        {error && <p className={css.error}>{error}</p>}

        {!isLoading && !error && visiblePsychologists.length > 0 && (
          <>
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
          </>
        )}

        {!isLoading && !error && visiblePsychologists.length === 0 && (
          <p className={css.status}>No psychologists found.</p>
        )}
      </Container>
    </section>
  );
}