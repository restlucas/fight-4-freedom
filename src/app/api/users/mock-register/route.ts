import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      ea_id: payload.ea_id,
    },
  });

  if (userAlreadyExists) {
    return NextResponse.json(
      { error: "Jogador já cadastrado!" },
      { status: 404 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name: payload.name,

      username: payload.username,
      password: await bcrypt.hash(payload.password, 10),
      platform: payload.platform,
      bio: payload.bio,
      ea_id: payload.ea_id,
      avatar: payload.avatar,
      role: payload.role || "USER",
    },
  });

  return NextResponse.json({
    message: "Jogador cadastrado com sucesso!",
    user: { id: user.id, username: user.username },
  });
}
