import { prisma } from "@/src/lib/prisma";
import { chunkArray } from "@/src/utils/chunk-helper";
import { mapStats } from "@/src/utils/map-stats";
import { scrapeStats } from "@/src/utils/scrap-stats";
import { TopStatsCategory } from "@prisma/client";

const CHUNK_SIZE = 10;

type StatsKeys =
  | "kills"
  | "revives"
  | "assists"
  | "matchesPlayed"
  | "killDeath"
  | "timePlayed";

export async function GET() {
  const users = await prisma.user.findMany({
    where: {
      ea_id: { not: "" },
      status: "ACTIVE",
    },
    select: {
      id: true,
      ea_id: true,
      platform: true,
      trackergg: true,
    },
  });

  const chunks = chunkArray(users, CHUNK_SIZE);
  let processed = 0;

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (user) => {
        try {
          if (!user.trackergg) return;

          const data = await scrapeStats(user.trackergg!);
          const mapped = mapStats(data);

          await prisma.stats.upsert({
            where: { user_id: user.id },
            create: { user_id: user.id, ...mapped },
            update: { ...mapped },
          });

          processed++;
        } catch (err) {
          console.error("Erro ao atualizar jogador", user.id, err);
        }
      })
    );

    await new Promise((r) => setTimeout(r, 1500));
  }

  const categories: { key: StatsKeys; category: TopStatsCategory }[] = [
    { key: "kills", category: TopStatsCategory.KILLS },
    { key: "revives", category: TopStatsCategory.REVIVES },
    { key: "assists", category: TopStatsCategory.ASSISTS },
    { key: "matchesPlayed", category: TopStatsCategory.MATCHES },
    { key: "killDeath", category: TopStatsCategory.KILLS_DEATHS },
    { key: "timePlayed", category: TopStatsCategory.TIME_PLAYED },
  ];

  for (const { key, category } of categories) {
    const top = await prisma.stats.findFirst({
      orderBy: { [key]: "desc" },
      select: { user_id: true },
    });

    if (top) {
      await prisma.topStats.upsert({
        where: { category },
        update: { user_id: top.user_id },
        create: { category, user_id: top.user_id },
      });
    }
  }

  const [membersCount, medalsCount, kdAgg, totals] = await Promise.all([
    prisma.user.count({
      where: {
        ea_id: { not: "" },
        status: "ACTIVE",
      },
    }),

    prisma.userMedal.count(),

    prisma.stats.aggregate({
      _avg: { killDeath: true },
    }),

    prisma.stats.aggregate({
      _sum: {
        wins: true,
        matchesPlayed: true,
      },
    }),
  ]);

  const totalWins = totals._sum.wins ?? 0;
  const totalMatches = totals._sum.matchesPlayed ?? 0;

  const clanWinRate = totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;

  await prisma.clanStats.upsert({
    where: { id: "f4f-stats" },
    update: {
      totalMembers: membersCount,
      totalMedals: medalsCount,
      averageKd: kdAgg._avg.killDeath ?? 0,
      averageWins: clanWinRate,
    },
    create: {
      id: "f4f-stats",
      totalMembers: membersCount,
      totalMedals: medalsCount,
      averageKd: kdAgg._avg.killDeath ?? 0,
      averageWins: clanWinRate,
    },
  });

  return Response.json({
    ok: true,
    totalUsers: users.length,
    processed,
  });
}
