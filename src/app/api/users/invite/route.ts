import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const user = await prisma.user.create({
      data: {
        ea_id: data.ea_id,
        name: data.name,
        platform: data.platform,
        role: data.role,
      },
    });

    const invite = await prisma.invite.create({
      data: {
        user_id: user.id,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });

    const inviteLink = `${BASE_URL}/convite?token=${invite.token}`;

    return NextResponse.json(
      { token: inviteLink, player_name: user.name },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
