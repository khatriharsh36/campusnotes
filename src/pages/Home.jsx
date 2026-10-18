import SearchBar from "../components/SearchBar";
import SubjectCard from "../components/SubjectCard";
import ResourceCard from "../components/ResourceCard";
import { SUBJECTS } from "../data/resources";
import { useState } from "react";

export default function Home({ resources, bookmarks, onToggleBookmark, onViewResource, onNavigate, onRateResource, onSubjectFilter }) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) onNavigate("explore", { search: search.trim() });
  };

  const subjectCounts = SUBJECTS.reduce((acc, s) => {
    acc[s] = resources.filter((r) => r.subject === s).length;
    return acc;
  }, {});

  const recent = [...resources]
    .sort((a, b) => new Date(b.uploadedDate) - new Date(a.uploadedDate))
    .slice(0, 6);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Academic Resource Hub
            </div>
            <h1 className="hero-title">
              Your Study Material,<br />
              <span className="gradient-text">All in One Place.</span>
            </h1>
            <p className="hero-subtitle">
              Discover notes, lab manuals, cheat sheets and academic resources shared by students across all semesters.
            </p>
            <div className="hero-search-wrap">
              <SearchBar
                value={search}
                onChange={setSearch}
                onSearch={handleSearch}
                placeholder="Search by title, subject or topic..."
              />
            </div>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => onNavigate("explore")}>
                🔍 Explore Resources
              </button>
              <button
                className="btn btn-lg"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                onClick={() => onNavigate("upload")}
              >
                ⬆️ Upload Resource
              </button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>{resources.length}</strong>
                <span>Resources</span>
              </div>
              <div className="hero-stat">
                <strong>{SUBJECTS.length}</strong>
                <span>Subjects</span>
              </div>
              <div className="hero-stat">
                <strong>500+</strong>
                <span>Students</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-bg" />
            <div className="hero-card-float card-1">
              <span className="hcf-icon hcf-1">☕</span> Java OOP Notes
            </div>
            <div className="hero-card-float card-2">
              <span className="hcf-icon hcf-2">🗄️</span> DBMS SQL Bank
            </div>
            <div className="hero-card-float card-3">
              <span className="hcf-icon hcf-3">🌲</span> DSA Cheat Sheet
            </div>
            <div className="hero-card-float card-4">
              <span className="hcf-icon hcf-4">📊</span> Data Analytics
            </div>
          </div>
        </div>
      </section>

      <div className="page">
        {/* ── Browse by Subject ── */}
        <section className="section">
          <div className="section-header">
            <div className="section-title-wrap">
              <p className="section-label">Categories</p>
              <h2 className="section-title">Browse by Subject</h2>
              <p className="section-subtitle">Find resources organized by your course subjects</p>
            </div>
          </div>
          <div className="subjects-grid">
            {SUBJECTS.map((subject) => (
              <SubjectCard
                key={subject}
                subject={subject}
                count={subjectCounts[subject]}
                onClick={(s) => { onSubjectFilter(s); onNavigate("explore"); }}
              />
            ))}
          </div>
        </section>

        {/* ── Recently Added ── */}
        <section className="section">
          <div className="section-header">
            <div className="section-title-wrap">
              <p className="section-label">Latest</p>
              <h2 className="section-title">Recently Added</h2>
            </div>
            <button className="section-link" onClick={() => onNavigate("explore")}>
              View all →
            </button>
          </div>
          <div className="resources-grid">
            {recent.map((resource) => (
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
        </section>
      </div>
    </div>
  );
}
