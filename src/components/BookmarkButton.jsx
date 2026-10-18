export default function BookmarkButton({ isBookmarked, onToggle, size = "md" }) {
  return (
    <button
      className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""} size-${size}`}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this resource"}
    >
      {isBookmarked ? "♥" : "♡"}
    </button>
  );
}
