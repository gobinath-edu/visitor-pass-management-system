export function formatStatus(status) {
  return status.replaceAll("_", " ");
}

export function formatDate(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium"
  }).format(new Date(`${dateString}T00:00:00`));
}

export function formatDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
