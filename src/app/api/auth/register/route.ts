import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  const { confirm_password, ...userData } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { ea_id: userData.ea_id },
  });

  if (!existingUser) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  const user = await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
      status: "ACTIVE",
    },
  });

  return NextResponse.json({
    message: "Usuário criado com sucesso",
    user: { id: user.id, username: user.username },
  });
}
