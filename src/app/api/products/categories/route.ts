import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/products/categories - 获取产品分类列表
export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch product categories" },
      { status: 500 }
    );
  }
}

// POST /api/products/categories - 创建产品分类
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, image, order } = body;

    const category = await prisma.productCategory.create({
      data: {
        name,
        slug,
        image,
        order: order || 0,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating product category:", error);
    return NextResponse.json(
      { error: "Failed to create product category" },
      { status: 500 }
    );
  }
}
