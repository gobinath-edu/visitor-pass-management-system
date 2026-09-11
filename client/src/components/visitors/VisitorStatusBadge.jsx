const STATUS_STYLES = {
  pending: {
    backgroundColor: "#fff7ed",
    color: "#c2410c",
  },
  approved: {
    backgroundColor: "#f0fdf4",
    color: "#15803d",
  },
  rejected: {
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
  },
  cancelled: {
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
  },
  checked_in: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
  },
  checked_out: {
    backgroundColor: "#f5f3ff",
    color: "#6d28d9",
  },
};

function VisitorStatusBadge({ status }) {
  const normalizedStatus = String(status || "")
    .toLowerCase()
    .replace(/\s+/g, "_");

  const style = STATUS_STYLES[normalizedStatus] || {
    backgroundColor: "#f3f4f6",
    color: "#374151",
  };

  const label = String(status || "Unknown")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <span
      style={{
        ...style,
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

export default VisitorStatusBadge;