import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/news/[id] - 获取单个新闻
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!news) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }

    // 增加浏览量
    await prisma.news.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

// PUT /api/news/[id] - 更新新闻
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, excerpt, content, image, categoryId, isPublished } = body;

    const existingNews = await prisma.news.findUnique({ where: { id } });

    if (!existingNews) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        categoryId,
        isPublished,
        publishedAt: isPublished && !existingNews.publishedAt ? new Date() : existingNews.publishedAt,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

// DELETE /api/news/[id] - 删除新闻
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
