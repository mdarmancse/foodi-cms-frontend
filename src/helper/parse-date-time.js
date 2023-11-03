// @TODO: it will change later
export function parseDateTime(dateTime) {
  if (!dateTime) return;

  return new Date(dateTime).toLocaleString();
}
