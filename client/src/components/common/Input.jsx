export default function Input({ label, error, ...props }) {
  return (
    <label className="field">
      {label && <span>{label}</span>}
      <input className={error ? "input input-error" : "input"} {...props} />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
