import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  console.log("===============================================");
  console.log("===============================================");
  console.log(username, password);
  console.log("===============================================");
  console.log("===============================================");

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user)
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 401 }
    );

  const isValid = await bcrypt.compare(password, user.password as string);

  if (!isValid)
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  const { password: _pwd, ...userData } = user;

  return NextResponse.json({
    ok: true,
    user: userData,
    token,
  });
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ ok: true, payload });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
