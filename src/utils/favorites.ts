
const FAVORITES_STORAGE_KEY = "favorite-psychologists";

function buildFavoritesKey(userId: string): string {
    return `${FAVORITES_STORAGE_KEY}:${userId}`;
}

export function getFavoriteIds(userId: string): string[] {
    const storageKey = buildFavoritesKey(userId);
    const savedData = localStorage.getItem(storageKey);

    if (!savedData) {
        return [];
    }

    try {
        const parsedData = JSON.parse(savedData) as string[];
        
        if (!Array.isArray(parsedData)) {
            return [];
        }
        return parsedData;
    } catch {
        return [];
    }
}

export function saveFavoriteIds(userId: string, favoriteIds: string[]): void {
    const storageKey = buildFavoritesKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
}

export function isFavorite(userId: string, psychologistId: string): boolean {
    const favoriteIds = getFavoriteIds(userId);
    return favoriteIds.includes(psychologistId)
}

export function toggleFavorite(userId: string, psychologistId: string): string[] {
    const favoriteIds = getFavoriteIds(userId);

    const updatedFavorites = favoriteIds.includes(psychologistId)
        ? favoriteIds.filter((id) => id !== psychologistId)
        : [...favoriteIds, psychologistId];
    
    saveFavoriteIds(userId, updatedFavorites);
    return updatedFavorites;
}

export function clearFavorites(userId: string): void {
    const storageKey = buildFavoritesKey(userId);
    localStorage.removeItem(storageKey);
}