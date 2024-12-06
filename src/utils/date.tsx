export function formattedDate(value: string) {
  const date = new Date(value).toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  return date;
}
