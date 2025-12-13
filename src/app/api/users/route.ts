import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { Platform, Rank, Status } from "@/src/lib/enums";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");
  const platform = searchParams.get("platform");
  const rank = searchParams.get("rank");
  const status = searchParams.get("status");

  const users = await prisma.user.findMany({
    include: { medals: true },
    where: {
      ...(username &&
        username !== "" && {
          username: { contains: username },
        }),
      ...(platform && platform !== "all" && { platform: platform as Platform }),
      ...(rank && rank !== "all" && { rank: rank as Rank }),
      ...(status && status !== "all" && { status: status as Status }),
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
    message: "Usuário criado com sucesso",
    user: { id: user.id, username: user.username },
  });
}
