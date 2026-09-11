export default function EmptyState({ title = "No data", message = "Nothing to show." }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  );
}
