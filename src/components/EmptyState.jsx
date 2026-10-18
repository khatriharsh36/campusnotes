export default function EmptyState({ icon = "📭", title, subtitle, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <h3 className="empty-title">{title}</h3>
      {subtitle && <p className="empty-subtitle">{subtitle}</p>}
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
