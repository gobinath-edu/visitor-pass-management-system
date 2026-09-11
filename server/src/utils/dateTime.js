export function getTodayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export function isToday(dateString) {
  return dateString === getTodayString();
}

export function combineDateAndTime(dateString, timeString) {
  return new Date(`${dateString}T${timeString}:00`);
}
