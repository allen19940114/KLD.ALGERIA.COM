import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET /api/media - 获取媒体文件列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const type = searchParams.get("type");

    const where: Record<string, unknown> = {};

    if (type) {
      where.type = type;
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.media.count({ where }),
    ]);

    // 计算总存储大小
    const totalSize = await prisma.media.aggregate({
      _sum: { size: true },
    });

    return NextResponse.json({
      data: media,
      totalSize: totalSize._sum.size || 0,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// POST /api/media - 上传媒体文件
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // 检查文件大小（10MB限制）
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || "10485760");
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large" },
        { status: 400 }
      );
    }

    // 确定文件类型
    const mimeType = file.type;
    let type = "document";
    if (mimeType.startsWith("image/")) {
      type = "image";
    } else if (mimeType.startsWith("video/")) {
      type = "video";
    }

    // 生成唯一文件名
    const ext = path.extname(file.name);
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}-${randomStr}${ext}`;

    // 确保上传目录存在
    const uploadDir = process.env.UPLOAD_DIR || "./public/uploads";
    const absoluteUploadDir = path.resolve(uploadDir);
    await mkdir(absoluteUploadDir, { recursive: true });

    // 保存文件
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(absoluteUploadDir, fileName);
    await writeFile(filePath, buffer);

    // 生成URL
    const url = `/uploads/${fileName}`;

    // 保存到数据库
    const media = await prisma.media.create({
      data: {
        name: file.name,
        url,
        type,
        size: file.size,
        mimeType,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json(
      { error: "Failed to upload media" },
      { status: 500 }
    );
  }
}
