export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

