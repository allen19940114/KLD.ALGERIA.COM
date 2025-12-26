import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/dashboard - 获取仪表盘统计数据
export async function GET() {
  try {
    const [
      newsCount,
      productsCount,
      projectsCount,
      unreadMessagesCount,
      recentNews,
      recentMessages,
    ] = await Promise.all([
      prisma.news.count({ where: { isPublished: true } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.project.count({ where: { isActive: true } }),
      prisma.message.count({ where: { isRead: false } }),
      prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          publishedAt: true,
          category: {
            select: { name: true },
          },
        },
      }),
      prisma.message.findMany({
        where: { isRead: false },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          createdAt: true,
        },
      }),
    ]);

    // 本月统计
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      newsThisMonth,
      productsThisMonth,
      projectsThisMonth,
      messagesThisMonth,
    ] = await Promise.all([
      prisma.news.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.product.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.project.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.message.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        news: {
          total: newsCount,
          thisMonth: newsThisMonth,
        },
        products: {
          total: productsCount,
          thisMonth: productsThisMonth,
        },
        projects: {
          total: projectsCount,
          thisMonth: projectsThisMonth,
        },
        messages: {
          unread: unreadMessagesCount,
          thisMonth: messagesThisMonth,
        },
      },
      recentNews,
      recentMessages,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
