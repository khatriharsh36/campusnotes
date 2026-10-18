import BookmarkButton from "./BookmarkButton";
import Rating from "./Rating";

const TYPE_COLORS = {
  Notes: { bg: "#EEF2FF", color: "#4F46E5" },
  "Cheat Sheet": { bg: "#F5F3FF", color: "#7C3AED" },
  "Lab Manual": { bg: "#ECFEFF", color: "#0891B2" },
  Assignment: { bg: "#FFFBEB", color: "#D97706" },
  "Question Bank": { bg: "#F0FDF4", color: "#16A34A" },
  "Reference Material": { bg: "#FEF2F2", color: "#DC2626" },
};

const ACCENT_GRADIENTS = {
  Notes: "linear-gradient(90deg,#4F46E5,#7C3AED)",
  "Cheat Sheet": "linear-gradient(90deg,#7C3AED,#9333EA)",
  "Lab Manual": "linear-gradient(90deg,#0891B2,#06B6D4)",
  Assignment: "linear-gradient(90deg,#D97706,#F59E0B)",
  "Question Bank": "linear-gradient(90deg,#16A34A,#22C55E)",
  "Reference Material": "linear-gradient(90deg,#DC2626,#EF4444)",
};

export default function ResourceCard({ resource, isBookmarked, onToggleBookmark, onView, onRate }) {
  const tc = TYPE_COLORS[resource.type] || TYPE_COLORS["Notes"];
  const gradient = ACCENT_GRADIENTS[resource.type] || ACCENT_GRADIENTS["Notes"];

  return (
    <div className="resource-card" onClick={() => onView(resource)}>
      <div className="resource-card-accent" style={{ background: gradient }} />
      <div className="resource-card-body">
        <div className="resource-card-header">
          <span
            className="resource-type-badge"
            style={{ background: tc.bg, color: tc.color }}
          >
            {resource.type}
          </span>
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggle={() => onToggleBookmark(resource.id)}
          />
        </div>

        <h3 className="resource-title">{resource.title}</h3>

        <div className="resource-meta">
          <span className="resource-subject">{resource.subject}</span>
          <span className="meta-dot">●</span>
          <span>{resource.topic}</span>
        </div>

        <span className="resource-semester">{resource.semester}</span>

        <div className="resource-card-footer">
          <Rating
            value={resource.rating}
            onRate={(r) => { onRate && onRate(resource.id, r); }}
          />
          <div className="resource-stats">
            <span>👁 {resource.views}</span>
            <span>📅 {resource.uploadedDate}</span>
          </div>
        </div>
      </div>

      <button
        className="btn btn-sm btn-outline view-btn"
        onClick={(e) => { e.stopPropagation(); onView(resource); }}
      >
        View Details →
      </button>
    </div>
  );
}
