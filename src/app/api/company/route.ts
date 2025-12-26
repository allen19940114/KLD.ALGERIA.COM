import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/company - 获取公司信息
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get("key");

    if (key) {
      const info = await prisma.companyInfo.findUnique({
        where: { key },
      });
      return NextResponse.json(info);
    }

    const companyInfo = await prisma.companyInfo.findMany();

    // 转换为键值对对象
    const infoObj: Record<string, unknown> = {};
    for (const info of companyInfo) {
      infoObj[info.key] = info.value;
    }

    return NextResponse.json(infoObj);
  } catch (error) {
    console.error("Error fetching company info:", error);
    return NextResponse.json(
      { error: "Failed to fetch company info" },
      { status: 500 }
    );
  }
}

// PUT /api/company - 更新公司信息
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // 批量更新
    const updates = Object.entries(body).map(([key, value]) =>
      prisma.companyInfo.upsert({
        where: { key },
        update: { value: value as object },
        create: { key, value: value as object },
      })
    );

    await Promise.all(updates);

    // 返回更新后的信息
    const companyInfo = await prisma.companyInfo.findMany();
    const infoObj: Record<string, unknown> = {};
    for (const info of companyInfo) {
      infoObj[info.key] = info.value;
    }

    return NextResponse.json(infoObj);
  } catch (error) {
    console.error("Error updating company info:", error);
    return NextResponse.json(
      { error: "Failed to update company info" },
      { status: 500 }
    );
  }
}
