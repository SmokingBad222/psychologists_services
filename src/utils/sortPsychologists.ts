import type { Psychologist, SortOption } from "../types/psychologist";

export function sortPsychologists(items: Psychologist[],
    sortOption: SortOption
): Psychologist[] {
    const sortedItems = [...items];

    switch (sortOption) {
        case 'name-asc':
            return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        
        case 'name-desc':
            return sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        
        case 'price-asc':
            return sortedItems.sort((a, b) => a.price_per_hour - b.price_per_hour);
        
        case 'price-desc':
            return sortedItems.sort((a, b) => b.price_per_hour - a.price_per_hour);
        
        case 'rating-asc':
            return sortedItems.sort((a, b) => a.rating - b.rating);
        
        case 'rating-desc':
            return sortedItems.sort((a, b) => b.rating - a.rating);
        
        default:
            return sortedItems;
    } 
}