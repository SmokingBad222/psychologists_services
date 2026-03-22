import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import css from "./PsychologistsList.module.css";

interface PsychologistsListProps {
  items: Psychologist[];
  favoriteIds: string[];
  onToggleFavorite: (psychologistId: string) => void; 
}

export default function PsychologistsList({
  items,
  favoriteIds,
  onToggleFavorite,
}: PsychologistsListProps) {
  return (
    <ul className={css.list}>
      {items.map((psychologist) => (
        <li key={psychologist.id}>
          <PsychologistCard
            psychologist={psychologist}
            isFavorite={favoriteIds.includes(psychologist.id)}
            onToggleFavorite={onToggleFavorite}          
          />
        </li>
      ))}
    </ul>
  );
}