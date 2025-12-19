const SCRAPER_SERVICE_API_KEY = process.env.SCRAPER_SERVICE_API_KEY || "";
const SCRAPER_SERVICE_API_URL = process.env.SCRAPER_SERVICE_API_URL || "";

export async function scrapeStats(profileUrl: string) {
  try {
    const response = await fetch(
      `${SCRAPER_SERVICE_API_URL}/scrape?url=${encodeURIComponent(profileUrl)}`,
      {
        headers: {
          "x-api-key": SCRAPER_SERVICE_API_KEY,
        },
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    return null;
  }
}
