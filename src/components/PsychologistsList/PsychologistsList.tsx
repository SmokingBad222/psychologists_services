import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import css from "./PsychologistsList.module.css";

interface PsychologistsListProps {
  items: Psychologist[];
}

export default function PsychologistsList({
  items,
}: PsychologistsListProps) {
  return (
    <ul className={css.list}>
      {items.map((psychologist) => (
        <li key={psychologist.id}>
          <PsychologistCard psychologist={psychologist} />
        </li>
      ))}
    </ul>
  );
}