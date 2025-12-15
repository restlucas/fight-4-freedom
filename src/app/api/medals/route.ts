import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { Rarity } from "@/src/lib/enums";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get("name");
    const rariry = searchParams.get("rarity");
    const assignee = searchParams.get("assignee");
    const assigned = searchParams.get("assigned");
    const page = searchParams.get("page");
    const size = searchParams.get("size");

    const medals = await prisma.medal.findMany({
      include: { userMedals: true },
      where: {
        ...(name &&
          name.trim() !== "" && {
            name: {
              contains: name,
              mode: "insensitive",
            },
          }),
        ...(rariry && rariry !== "all" && { rarity: rariry as Rarity }),
        ...(assignee &&
          assigned === "true" && {
            userMedals: {
              some: {
                user_id: assignee,
              },
            },
          }),
        ...(assignee &&
          assigned === "false" && {
            userMedals: {
              none: {
                user_id: assignee,
              },
            },
          }),
      },
      ...(page &&
        size && {
          skip: (parseInt(page) - 1) * parseInt(size),
          take: parseInt(size),
        }),
    });

    return NextResponse.json(medals);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao buscar medalhas",
        error: error,
        ok: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const medalData = await req.json();

    const medal = await prisma.medal.create({
      data: medalData,
    });

    return NextResponse.json({
      message: "Medalha criada com sucesso",
      medal: { id: medal.id, name: medal.name },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao criar medalha",
        error: error,
        ok: false,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const medalData = await req.json();

    const medal = await prisma.medal.update({
      where: { id: medalData.id },
      data: medalData,
    });

    return NextResponse.json({
      message: "Medalha atualizada com sucesso",
      medal: medal,
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao atualizar medalha",
        error: error,
        ok: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { medalId } = await req.json();

    const medal = await prisma.medal.delete({
      where: { id: medalId },
    });

    return NextResponse.json({
      message: "Medalha deletada com sucesso",
      medal: medal,
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao deletar medalha",
        error: error,
        ok: false,
      },
      { status: 500 }
    );
  }
}
