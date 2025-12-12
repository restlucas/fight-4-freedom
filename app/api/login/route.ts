import { NextResponse } from "next/server";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL! || "http://localhost:4000";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, message: "Username e password são obrigatórios" },
        { status: 400 }
      );
    }

    const res = await fetch(`${JSON_SERVER_URL}/users?username=${username}`);
    const users = await res.json();

    const user = users[0];

    if (!user || user.password !== password) {
      return NextResponse.json(
        { ok: false, message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      user,
    });

    response.cookies.set({
      name: "session",
      value: user.id.toString(),
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { ok: false, message: "Erro no login" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const baseUrl = process.env.JSON_SERVER_URL!;
  const users = await fetch(`${baseUrl}/users`).then((r) => r.json());
  return NextResponse.json(users);
}
