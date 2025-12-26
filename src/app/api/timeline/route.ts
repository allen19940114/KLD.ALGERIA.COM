import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/timeline - 获取时间线
export async function GET() {
  try {
    const timeline = await prisma.timeline.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(timeline);
  } catch (error) {
    console.error("Error fetching timeline:", error);
    return NextResponse.json(
      { error: "Failed to fetch timeline" },
      { status: 500 }
    );
  }
}

// POST /api/timeline - 创建时间线条目
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, title, description, order } = body;

    const item = await prisma.timeline.create({
      data: {
        year,
        title,
        description,
        order: order || 0,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating timeline item:", error);
    return NextResponse.json(
      { error: "Failed to create timeline item" },
      { status: 500 }
    );
  }
}

// PUT /api/timeline - 批量更新时间线
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const items = body.items as Array<{
      id?: string;
      year: string;
      title: object;
      description?: object;
      order: number;
    }>;

    // 删除所有现有条目并重新创建
    await prisma.timeline.deleteMany();

    const created = await prisma.timeline.createMany({
      data: items.map((item, index) => ({
        year: item.year,
        title: item.title,
        description: item.description,
        order: item.order ?? index,
      })),
    });

    const timeline = await prisma.timeline.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(timeline);
  } catch (error) {
    console.error("Error updating timeline:", error);
    return NextResponse.json(
      { error: "Failed to update timeline" },
      { status: 500 }
    );
  }
}
