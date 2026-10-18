export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">📚</span>
          <span className="brand-name">CampusNotes</span>
          <p className="footer-tagline">Academic resources, shared by students.</p>
        </div>
        <div className="footer-links">
          <button onClick={() => onNavigate("home")}>Home</button>
          <button onClick={() => onNavigate("explore")}>Explore</button>
          <button onClick={() => onNavigate("upload")}>Upload</button>
          <button onClick={() => onNavigate("bookmarks")}>Bookmarks</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 CampusNotes · Built with React · For academic use only</p>
      </div>
    </footer>
  );
}
