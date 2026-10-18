import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "Explore", page: "explore" },
  { label: "Upload", page: "upload" },
  { label: "Bookmarks", page: "bookmarks" },
];

export default function Navbar({ currentPage, onNavigate, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => handleNav("home")}>
          <span className="brand-icon">📚</span>
          <span className="brand-name">CampusNotes</span>
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              className={`nav-link ${currentPage === link.page ? "active" : ""}`}
              onClick={() => handleNav(link.page)}
            >
              {link.label}
            </button>
          ))}
          <button className="btn btn-outline nav-login" onClick={() => handleNav("login")}>
            Login
          </button>
          <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="navbar-mobile-actions">
          <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              className={`mobile-nav-link ${currentPage === link.page ? "active" : ""}`}
              onClick={() => handleNav(link.page)}
            >
              {link.label}
            </button>
          ))}
          <button className="btn btn-outline" onClick={() => handleNav("login")}>
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
