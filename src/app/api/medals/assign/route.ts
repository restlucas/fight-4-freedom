import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, assign = [], unassign = [] } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "userId é obrigatório" },
        { status: 400 }
      );
    }

    await prisma.$transaction([
      ...(assign.length > 0
        ? assign.map((medalId: string) =>
            prisma.userMedal.upsert({
              where: {
                user_id_medal_id: {
                  user_id: userId,
                  medal_id: medalId,
                },
              },
              create: { user_id: userId, medal_id: medalId },
              update: {},
            })
          )
        : []),

      ...(unassign.length > 0
        ? [
            prisma.userMedal.deleteMany({
              where: {
                user_id: userId,
                medal_id: {
                  in: unassign,
                },
              },
            }),
          ]
        : []),
    ]);

    return NextResponse.json({
      success: true,
      assigned: assign.length,
      unassigned: unassign.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atribuir medalhas" },
      { status: 500 }
    );
  }
}
