import css from "./LoadMoreButton.module.css";

interface LoadMoreButtonProps {
    onClick: () => void;
}

export default function LoadMoreButton({ onClick, }: LoadMoreButtonProps) {
    return (
        <button type="button" className={css.button} onClick={onClick}>Load more</button>
    );
}