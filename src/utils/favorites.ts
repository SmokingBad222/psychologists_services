const FAVORITES_KEY = "favorite-psychologists";

export function getFavoriteIds(): string[] {
    const savedData = localStorage.getItem(FAVORITES_KEY);

    if (!savedData) {
        return [];
    }

    try {
        const parsedData = JSON.parse(savedData);
        
        return Array.isArray(parsedData) ? parsedData : [];
    } catch {
        return [];
    }
}

export function saveFavoriteIds(ids: string[]): void {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}