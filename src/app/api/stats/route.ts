import { prisma } from "@/src/lib/prisma";
import { chunkArray } from "@/src/utils/chunk-helper";
import { mapStats } from "@/src/utils/map-stats";

const CHUNK_SIZE = 10;

export async function POST() {
  const users = await prisma.user.findMany({
    where: {
      ea_id: { not: "" },
      status: "ACTIVE",
    },
    select: {
      id: true,
      ea_id: true,
      platform: true,
    },
  });

  const chunks = chunkArray(users, CHUNK_SIZE);

  let processed = 0;

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (user) => {
        try {
          const url = new URL("https://api.gametools.network/bf6/stats");
          url.searchParams.set("name", String(user.ea_id));

          const res = await fetch(url.toString(), {
            headers: { "User-Agent": "bf6-stats-sync" },
            cache: "no-store",
          });

          if (!res.ok) return;

          const data = await res.json();
          const mapped = mapStats(data);

          await prisma.stats.upsert({
            where: { user_id: user.id },
            create: {
              user_id: user.id,
              ...mapped,
            },
            update: {
              ...mapped,
            },
          });

          processed++;
        } catch (err) {
          console.error("Erro ao atualizar jogador", user.id, err);
        }
      })
    );

    await new Promise((r) => setTimeout(r, 1500));
  }

  return Response.json({
    ok: true,
    totalUsers: users.length,
    processed,
  });
}
