import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { Platform, Rank, Role, Status } from "@/src/lib/enums";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");
  const platform = searchParams.get("platform");
  const rank = searchParams.get("rank");
  const status = searchParams.get("status");
  const role = searchParams.get("role");

  const users = await prisma.user.findMany({
    include: {
      userMedals: {
        include: {
          medal: true,
        },
      },
      userStats: true,
    },
    where: {
      ...(username &&
        username !== "" && {
          username: { contains: username },
        }),
      ...(platform && platform !== "all" && { platform: platform as Platform }),
      ...(rank && rank !== "all" && { rank: rank as Rank }),
      ...(status && status !== "all" && { status: status as Status }),
      ...(role && role !== "all" && { role: role as Role }),
    },
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const userData = await req.json();

  const user = await prisma.user.create({
    data: {
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
      status: "ACTIVE",
    },
  });

  return NextResponse.json({
    message: "Jogador registrado com sucesso",
    user: { id: user.id, username: user.username },
  });
}

export async function PUT(req: NextRequest) {
  const userData = await req.json();

  const user = await prisma.user.update({
    where: { id: userData.id },
    data: userData,
  });

  return NextResponse.json({
    message: "Jogador atualizado com sucesso",
    user: user,
    ok: true,
  });
}
