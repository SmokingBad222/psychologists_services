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
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: "name-asc", label: "A to Z" },
    { value: "name-desc", label: "Z to A" },
    { value: "price-asc", label: "Price low to high" },
    { value: "price-desc", label: "Price high to low" },
    { value: "popular", label: "Popular" },
    { value: "not-popular", label: "Not popular" },
    { value: "show-all", label: "Show all"},
  ]

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
            <p className={css.label}>
              Filters
            </p>

            <div className={css.dropdown}>
              <button
                type="button"
                className={css.dropdownButton}
                onClick={() => setIsSortOpen((prev) => !prev)}
              >
                <span>
                  {sortOptions.find((option) => option.value === sortOption)?.label}
                </span>

                <span className={css.dropdownArrow}>
                  {isSortOpen ? "▲" : "▼"}
                </span>
              </button>

              {isSortOpen && (
                <div className={css.dropdownMenu}>
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={css.dropdownItem}
                      onClick={() => {
                        setSortOption(option.value as SortOption);
                        setIsSortOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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