import { SUBJECTS, RESOURCE_TYPES, SEMESTERS } from "../data/resources";

export default function FilterBar({ filters, onFilterChange, onClear }) {
  const hasActive = filters.subject || filters.type || filters.semester || filters.sort !== "newest";

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Subject</label>
        <select
          className="filter-select"
          value={filters.subject}
          onChange={(e) => onFilterChange("subject", e.target.value)}
        >
          <option value="">All Subjects</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Type</label>
        <select
          className="filter-select"
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
        >
          <option value="">All Types</option>
          {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Semester</label>
        <select
          className="filter-select"
          value={filters.semester}
          onChange={(e) => onFilterChange("semester", e.target.value)}
        >
          <option value="">All Semesters</option>
          {SEMESTERS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <select
          className="filter-select"
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
          <option value="az">A–Z</option>
        </select>
      </div>

      {hasActive && (
        <button className="btn btn-ghost clear-filters" onClick={onClear}>
          ✕ Clear Filters
        </button>
      )}
    </div>
  );
}
