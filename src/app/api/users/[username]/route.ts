import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { username: string } }
) {
  const { username } = context.params;

  try {
    const user = await prisma.user.findFirst({
      where: { username },
      include: {
        userMedals: {
          include: {
            medal: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}

export async function DELETE(context: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await context.params;

  const user = await prisma.user.delete({
    where: { username },
  });

  return NextResponse.json({
    message: "Usuário deletado com sucesso",
    user: user,
    ok: true,
  });
}
