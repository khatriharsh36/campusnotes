import ResourceCard from "../components/ResourceCard";
import EmptyState from "../components/EmptyState";

export default function Bookmarks({ resources, bookmarks, onToggleBookmark, onViewResource, onNavigate, onRateResource }) {
  const bookmarked = resources.filter((r) => bookmarks.includes(r.id));

  return (
    <div>
      <div className="page-banner">
        <div className="page-banner-inner">
          <p className="page-banner-label">🔖 Saved</p>
          <h1 className="page-banner-title">Bookmarks</h1>
          <p className="page-banner-subtitle">
            {bookmarked.length > 0
              ? `You have ${bookmarked.length} saved resource${bookmarked.length !== 1 ? "s" : ""}`
              : "Your saved resources appear here"}
          </p>
        </div>
      </div>

      <div className="page">
        {bookmarked.length === 0 ? (
          <EmptyState
            icon="🔖"
            title="No saved resources yet."
            subtitle="Save resources while exploring and find them here later."
            actionLabel="Explore Resources"
            onAction={() => onNavigate("explore")}
          />
        ) : (
          <div className="resources-grid">
            {bookmarked.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isBookmarked={true}
                onToggleBookmark={onToggleBookmark}
                onView={onViewResource}
                onRate={onRateResource}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
