import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function getInitials(name: string): string {
  const cleanedName = name
    .replace(/^\[.*?\]\s*/, "")
    .replace(/^F4F[_\s]?/i, "");

  return cleanedName.slice(0, 2).toUpperCase();
}

export function parseTimePlayed(str: string) {
  const parts = str.split(",").map((x) => x.trim());
  let totalMinutes = 0;

  for (const p of parts) {
    if (p.includes("day")) {
      const days = parseInt(p.replace("days", "").replace("day", "").trim());
      totalMinutes += days * 24 * 60;
    } else {
      const [h, m, s] = p.split(":").map(Number);
      totalMinutes += h * 60 + m + Math.floor(s / 60);
    }
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h${minutes}min`;
}
