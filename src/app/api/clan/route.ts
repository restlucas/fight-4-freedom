import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const stats = await prisma.clanStats.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!stats) {
    return Response.json({ message: "Clan stats not found" }, { status: 404 });
  }

  return Response.json({
    id: stats.id,
    totalMembers: stats.totalMembers,
    totalMedals: stats.totalMedals,
    averageKd: stats.averageKd,
    averageWins: stats.averageWins,
    updatedAt: stats.updatedAt,
  });
}
