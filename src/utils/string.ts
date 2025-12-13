export function getInitials(name: string): string {
  const cleanedName = name
    .replace(/^\[.*?\]\s*/, "")
    .replace(/^F4F[_\s]?/i, "");

  return cleanedName.slice(0, 2).toUpperCase();
}
