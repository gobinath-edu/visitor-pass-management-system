export default function Select({ label, error, children, ...props }) {
  return (
    <label className="field">
      {label && <span>{label}</span>}
      <select className={error ? "input input-error" : "input"} {...props}>
        {children}
      </select>
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
