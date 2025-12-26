import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/news/categories - 获取新闻分类列表
export async function GET() {
  try {
    const categories = await prisma.newsCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { news: true },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching news categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch news categories" },
      { status: 500 }
    );
  }
}

// POST /api/news/categories - 创建新闻分类
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, order } = body;

    const category = await prisma.newsCategory.create({
      data: {
        name,
        slug,
        order: order || 0,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating news category:", error);
    return NextResponse.json(
      { error: "Failed to create news category" },
      { status: 500 }
    );
  }
}
