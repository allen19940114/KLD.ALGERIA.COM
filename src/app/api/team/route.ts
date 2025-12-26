import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/team - 获取团队成员列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const active = searchParams.get("active");

    const where: Record<string, unknown> = {};

    if (active === "true") {
      where.isActive = true;
    } else if (active === "false") {
      where.isActive = false;
    }

    const team = await prisma.teamMember.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 }
    );
  }
}

// POST /api/team - 创建团队成员
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, bio, image, order, isActive } = body;

    const member = await prisma.teamMember.create({
      data: {
        name,
        position,
        bio,
        image,
        order: order || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}
