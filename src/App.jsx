import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Rating from "./components/Rating";
import BookmarkButton from "./components/BookmarkButton";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import initialResources from "./data/resources";

function ResourceDetail({ resource, isBookmarked, onToggleBookmark, onRate }) {
  if (!resource) return null;
  return (
    <div className="resource-detail">
      <div className="detail-top-bar" />
      <div className="detail-header">
        <div>
          <span className="resource-type-badge detail-badge">{resource.type}</span>
          <h2 className="detail-title">{resource.title}</h2>
          <p className="detail-meta">
            <span>{resource.subject}</span> · <span>{resource.topic}</span> · <span>{resource.semester}</span>
          </p>
        </div>
        <BookmarkButton isBookmarked={isBookmarked} onToggle={() => onToggleBookmark(resource.id)} size="lg" />
      </div>

      <p className="detail-description">{resource.description}</p>

      <div className="detail-stats">
        <div className="detail-stat">
          <span className="stat-label">Uploaded by</span>
          <span className="stat-value">{resource.uploadedBy}</span>
        </div>
        <div className="detail-stat">
          <span className="stat-label">Date</span>
          <span className="stat-value">{resource.uploadedDate}</span>
        </div>
        <div className="detail-stat">
          <span className="stat-label">Views</span>
          <span className="stat-value">👁 {resource.views}</span>
        </div>
        <div className="detail-stat">
          <span className="stat-label">File</span>
          <span className="stat-value">📄 {resource.fileName}</span>
        </div>
      </div>

      <div className="detail-rating">
        <span className="stat-label">Rate this resource:</span>
        <Rating value={resource.rating} onRate={(r) => onRate(resource.id, r)} />
      </div>

      <button
        className="btn btn-primary btn-lg"
        onClick={() => alert(`Download simulation: "${resource.fileName}"\n\nIn a real application, this would download the file.`)}
      >
        ⬇️ Download PDF
      </button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [resources, setResources] = useState(initialResources);
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cn_bookmarks") || "[]"); }
    catch { return []; }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem("cn_theme") || "dark");
  const [selectedResource, setSelectedResource] = useState(null);
  const [exploreSearch, setExploreSearch] = useState("");
  const [exploreSubject, setExploreSubject] = useState("");

  useEffect(() => {
    localStorage.setItem("cn_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("cn_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const rateResource = (id, rating) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rating } : r))
    );
  };

  const addResource = (resource) => {
    setResources((prev) => [resource, ...prev]);
  };

  const navigate = (target, params = {}) => {
    if (params.search !== undefined) setExploreSearch(params.search);
    if (params.subject !== undefined) setExploreSubject(params.subject);
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setSubjectFilter = (subject) => setExploreSubject(subject);

  const viewResource = (resource) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, views: r.views + 1 } : r))
    );
    setSelectedResource({ ...resource, views: resource.views + 1 });
  };

  const commonProps = {
    resources,
    bookmarks,
    onToggleBookmark: toggleBookmark,
    onViewResource: viewResource,
    onNavigate: navigate,
    onRateResource: rateResource,
  };

  return (
    <div className="app">
      <Navbar
        currentPage={page}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <main className="main-content">
        {page === "home" && (
          <Home {...commonProps} onSubjectFilter={setSubjectFilter} />
        )}
        {page === "explore" && (
          <Explore
            {...commonProps}
            initialSearch={exploreSearch}
            initialSubject={exploreSubject}
          />
        )}
        {page === "upload" && (
          <Upload onAddResource={addResource} onNavigate={navigate} />
        )}
        {page === "bookmarks" && (
          <Bookmarks {...commonProps} />
        )}
        {page === "login" && (
          <Login onNavigate={navigate} />
        )}
      </main>

      <Footer onNavigate={navigate} />

      <Modal isOpen={!!selectedResource} onClose={() => setSelectedResource(null)} size="lg">
        <ResourceDetail
          resource={selectedResource}
          isBookmarked={selectedResource ? bookmarks.includes(selectedResource.id) : false}
          onToggleBookmark={toggleBookmark}
          onRate={rateResource}
        />
      </Modal>
    </div>
  );
}
