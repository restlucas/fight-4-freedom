import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { ea_id: payload.ea_id },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Jogador já cadastrado!" },
      { status: 404 }
    );
  }

  const user = await prisma.user.create({
    data: payload,
  });

  return NextResponse.json({
    message: "Jogador pré-cadastrado com sucesso!",
    user: { id: user.id, username: user.username },
  });
}

export async function PUT(req: NextRequest) {
  const { confirm_password, ...userData } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { ea_id: userData.ea_id },
  });

  if (!existingUser) {
    return NextResponse.json(
      { error: "Jogador não encontrado!" },
      { status: 404 }
    );
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
      status: "ACTIVE",
    },
  });

  return NextResponse.json({
    message: "Informações registradas com sucesso!",
    user: { id: existingUser.id, username: existingUser.username },
  });
}
