import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
  const { playerId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { id: playerId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Jogador não encontrado" },
      { status: 404 }
    );
  }

  const invite = await prisma.invite.findFirst({
    where: { user_id: playerId, used: false },
  });

  if (!invite) {
    return NextResponse.json(
      { error: "Convite não encontrado" },
      { status: 404 }
    );
  }

  await prisma.invite.update({
    where: { id: invite.id },
    data: {
      used: true,
      usedAt: new Date(),
    },
  });

  const newInvite = await prisma.invite.create({
    data: {
      user_id: playerId,
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });

  const inviteLink = `${BASE_URL}/convite?token=${newInvite.token}`;

  return NextResponse.json(
    { token: inviteLink, player_name: user.name },
    { status: 201 }
  );
}
