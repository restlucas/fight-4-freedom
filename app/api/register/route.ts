import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email e senha são obrigatórios" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      id: 1,
      email,
      message: "Usuário registrado com sucesso!",
    },
    { status: 201 }
  );
}
