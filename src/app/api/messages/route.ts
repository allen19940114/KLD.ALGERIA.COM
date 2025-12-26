import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/messages - 获取留言列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const read = searchParams.get("read");

    const where: Record<string, unknown> = {};

    if (read === "true") {
      where.isRead = true;
    } else if (read === "false") {
      where.isRead = false;
    }

    const [messages, total, unreadCount] = await Promise.all([
      prisma.message.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.message.count({ where }),
      prisma.message.count({ where: { isRead: false } }),
    ]);

    return NextResponse.json({
      data: messages,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST /api/messages - 创建留言（公开接口，用于联系表单）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, content } = body;

    // 验证必填字段
    if (!name || !email || !content) {
      return NextResponse.json(
        { error: "Name, email, and content are required" },
        { status: 400 }
      );
    }

    // 简单邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        name,
        email,
        phone,
        company,
        subject,
        content,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
