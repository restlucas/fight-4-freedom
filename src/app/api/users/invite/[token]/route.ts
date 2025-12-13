import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;

  if (!token) {
    return NextResponse.json({ error: "Token é obrigatório" }, { status: 400 });
  }

  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite) {
    return NextResponse.json(
      { error: "Convite não encontrado" },
      { status: 404 }
    );
  }

  if (invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Convite expirado" }, { status: 400 });
  }

  if (invite.used) {
    return NextResponse.json(
      { error: "Convite já utilizado" },
      { status: 400 }
    );
  }

  await prisma.invite.update({
    where: { id: invite.id },
    data: {
      used: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: invite.user_id },
  });

  return NextResponse.json({ user, can_register: true });
}
