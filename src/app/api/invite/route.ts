import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request) {
  try {
    const { ea_id } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        ea_id: ea_id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Jogador não encontrado!" },
        { status: 404 }
      );
    }

    const userAlreadyHasUnusedInvite = await prisma.invite.findFirst({
      where: {
        user_id: user.id,
        used: false,
      },
    });

    if (userAlreadyHasUnusedInvite) {
      await prisma.invite.update({
        where: {
          id: userAlreadyHasUnusedInvite.id,
        },
        data: {
          used: true,
        },
      });
    }

    const invite = await prisma.invite.create({
      data: {
        user_id: user.id,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });

    const inviteLink = `${BASE_URL}/convite?token=${invite.token}`;

    return NextResponse.json(
      { invite_link: inviteLink, player_name: user.name },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
