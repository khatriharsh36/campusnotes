import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ResourceCard from "../components/ResourceCard";
import EmptyState from "../components/EmptyState";

const DEFAULT_FILTERS = { subject: "", type: "", semester: "", sort: "newest" };

export default function Explore({ resources, bookmarks, onToggleBookmark, onViewResource, onNavigate, onRateResource, initialSearch, initialSubject }) {
  const [search, setSearch] = useState(initialSearch || "");
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, subject: initialSubject || "" });

  useEffect(() => {
    if (initialSearch) setSearch(initialSearch);
    if (initialSubject) setFilters((f) => ({ ...f, subject: initialSubject }));
  }, [initialSearch, initialSubject]);

  const handleFilterChange = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  const handleClear = () => {
    setSearch("");
    setFilters(DEFAULT_FILTERS);
  };

  const filtered = resources
    .filter((r) => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q) || r.topic.toLowerCase().includes(q);
      const matchSubject = !filters.subject || r.subject === filters.subject;
      const matchType = !filters.type || r.type === filters.type;
      const matchSemester = !filters.semester || r.semester === filters.semester;
      return matchSearch && matchSubject && matchType && matchSemester;
    })
    .sort((a, b) => {
      if (filters.sort === "rating") return b.rating - a.rating;
      if (filters.sort === "az") return a.title.localeCompare(b.title);
      return new Date(b.uploadedDate) - new Date(a.uploadedDate);
    });

  return (
    <div>
      <div className="page-banner">
        <div className="page-banner-inner">
          <p className="page-banner-label">📚 Discover</p>
          <h1 className="page-banner-title">Explore Resources</h1>
          <p className="page-banner-subtitle">Search and filter through {resources.length} academic resources</p>
        </div>
      </div>

      <div className="page">
        <div className="explore-search">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by title, subject or topic..." />
        </div>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} onClear={handleClear} />

        <div className="results-info">
          <span className="results-count">{filtered.length} resource{filtered.length !== 1 ? "s" : ""} found</span>
          {(search || filters.subject || filters.type || filters.semester) && (
            <button className="btn btn-ghost btn-sm" onClick={handleClear}>Clear all</button>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No resources found"
            subtitle="Try adjusting your search or filters."
            actionLabel="Clear Filters"
            onAction={handleClear}
          />
        ) : (
          <div className="resources-grid">
            {filtered.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isBookmarked={bookmarks.includes(resource.id)}
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
