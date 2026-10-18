export default function SearchBar({ value, onChange, onSearch, placeholder = "Search resources..." }) {
  const handleKey = (e) => {
    if (e.key === "Enter" && onSearch) onSearch();
  };

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")} title="Clear">
          ✕
        </button>
      )}
    </div>
  );
}
