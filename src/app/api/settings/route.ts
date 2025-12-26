import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/settings - 获取所有设置
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get("key");

    if (key) {
      const setting = await prisma.setting.findUnique({
        where: { key },
      });
      return NextResponse.json(setting);
    }

    const settings = await prisma.setting.findMany();

    // 转换为键值对对象
    const settingsObj: Record<string, unknown> = {};
    for (const setting of settings) {
      settingsObj[setting.key] = setting.value;
    }

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT /api/settings - 更新设置
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // 批量更新设置
    const updates = Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: value as object },
        create: { key, value: value as object },
      })
    );

    await Promise.all(updates);

    // 返回更新后的设置
    const settings = await prisma.setting.findMany();
    const settingsObj: Record<string, unknown> = {};
    for (const setting of settings) {
      settingsObj[setting.key] = setting.value;
    }

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
