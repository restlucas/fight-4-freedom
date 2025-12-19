import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function scrapeStats(profileUrl: string) {
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36"
  );

  await page.goto(profileUrl, { waitUntil: "networkidle2", timeout: 60000 });

  await page.waitForSelector(".stat-name", { timeout: 60000 });

  const data = await page.evaluate(() => {
    function parseNumber(val: any) {
      if (!val) return 0;
      val = val.trim().replace(/,/g, "");
      if (val.endsWith("%")) return parseFloat(val.replace("%", ""));
      if (val.toLowerCase().endsWith("k"))
        return parseFloat(val.toLowerCase().replace("k", "")) * 1000;
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    }

    function parseTimeInMinutes(raw: any) {
      let minutes = 0;
      const h = raw.match(/(\d+)\s*h/);
      const m = raw.match(/(\d+)\s*m/);
      if (h) minutes += parseInt(h[1]) * 60;
      if (m) minutes += parseInt(m[1]);
      return minutes;
    }

    const finalData = {
      kills: 0,
      deaths: 0,
      wins: 0,
      losses: 0,
      hsPercent: 0,
      assists: 0,
      revives: 0,
      killDeath: 0,
      objectivesCaptured: 0,
      objectivesDestroyed: 0,
      bestClass: null,
      timePlayed: 0,
    };

    const classSections = Array.from(
      document.querySelectorAll("section.v3-card")
    );
    const classSection = classSections.find((s) =>
      s.querySelector(".v3-card__title")?.textContent.includes("Classes")
    );

    if (classSection) {
      const classBlocks = classSection.querySelectorAll(
        ".flex.items-center.gap-4"
      );
      let maxMin = -1;
      let totalMin = 0;

      classBlocks.forEach((block) => {
        const name = block.querySelector("span.text-12")?.textContent.trim();
        const timeRaw =
          block.querySelector(".stat-value span")?.textContent.trim() || "";
        const mins = parseTimeInMinutes(timeRaw);

        totalMin += mins;
        if (mins > maxMin) {
          maxMin = mins;
          finalData.bestClass = name as any;
        }
      });
      finalData.timePlayed = Number((totalMin / 60).toFixed(1));
    }

    function getStatFromContainer(container: any, labelName: any) {
      const allStats = container.querySelectorAll(".stat-ver, .stat-hor");
      for (const stat of allStats) {
        const name = stat
          .querySelector(".stat-name")
          ?.textContent.trim()
          .toLowerCase();
        if (name === labelName.toLowerCase()) {
          return stat.querySelector(".stat-value")?.textContent.trim();
        }
      }
      return null;
    }

    const gridStats = document.querySelector(".grid.grid-cols-2.gap-px");
    if (gridStats) {
      finalData.hsPercent = parseNumber(getStatFromContainer(gridStats, "HS%"));
      finalData.objectivesCaptured = parseNumber(
        getStatFromContainer(gridStats, "Objectives Captured")
      );
      finalData.objectivesDestroyed = parseNumber(
        getStatFromContainer(gridStats, "Objectives Destroyed")
      );
    }

    const detailedGrids = document.querySelectorAll(
      ".v3-card__body.grid.grid-cols-2"
    );

    detailedGrids.forEach((grid) => {
      finalData.wins += parseNumber(getStatFromContainer(grid, "Wins"));
      finalData.kills += parseNumber(getStatFromContainer(grid, "Kills"));

      const l = getStatFromContainer(grid, "Losses");
      if (l) finalData.losses += parseNumber(l);

      const a = getStatFromContainer(grid, "Assists");
      if (a) finalData.assists += parseNumber(a);

      const d = getStatFromContainer(grid, "Deaths");
      if (d) finalData.deaths += parseNumber(d);

      const r = getStatFromContainer(grid, "Revives");
      if (r) finalData.revives += parseNumber(r);
    });

    if (finalData.deaths > 0) {
      finalData.killDeath = Number(
        (finalData.kills / finalData.deaths).toFixed(2)
      );
    } else {
      finalData.killDeath = finalData.kills;
    }

    return finalData;
  });

  await browser.close();
  return data;
}
