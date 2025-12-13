import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) throw new Error("Usuário não encontrado");

    const { password, ...userData } = user;
    return NextResponse.json(userData);
  } catch (err) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
