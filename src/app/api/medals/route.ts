import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Rarity } from "@/src/lib/enums";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get("name");
    const rarity = searchParams.get("rarity");
    const assignee = searchParams.get("assignee");
    const assigned = searchParams.get("assigned");

    const page = Number(searchParams.get("page") ?? 1);
    const size = Number(searchParams.get("size") ?? 20);

    const where = {
      ...(name &&
        name.trim() !== "" && {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }),
      ...(rarity && rarity !== "all" && { rarity: rarity as Rarity }),
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
    };

    const totalClanMembers = await prisma.user.count({
      where: {
        status: "ACTIVE",
      },
    });

    const [items, total] = await prisma.$transaction([
      prisma.medal.findMany({
        include: {
          _count: {
            select: {
              userMedals: {
                where: {
                  user: {
                    status: "ACTIVE",
                  },
                },
              },
            },
          },
        },
        where: {
          ...where,
          name: {
            contains: name ?? "",
            mode: "insensitive",
          },
        },
        skip: (page - 1) * size,
        take: size,
      }),
      prisma.medal.count({
        where: {
          ...where,
          name: {
            contains: name ?? "",
            mode: "insensitive",
          },
        },
      }),
    ]);

    const itemsWithPercentage = items.map((medal) => {
      const achieved = medal._count.userMedals;

      const achievedPercentage =
        totalClanMembers > 0
          ? Math.round((achieved / totalClanMembers) * 100)
          : 0;

      return {
        ...medal,
        achieved: {
          count: achieved,
          percentage: achievedPercentage,
        },
      };
    });

    return NextResponse.json({
      items: itemsWithPercentage,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
      totalClanMembers,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao buscar medalhas",
        error,
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
