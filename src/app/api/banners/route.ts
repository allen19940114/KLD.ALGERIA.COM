import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/banners - 获取Banner列表
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

    const banners = await prisma.banner.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

// POST /api/banners - 创建Banner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, image, link, order, isActive } = body;

    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle,
        image,
        link,
        order: order || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
