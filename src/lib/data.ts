import { prisma } from "./db";

// 多语言内容类型
type LocalizedContent = {
  en: string;
  zh: string;
  fr: string;
  ar: string;
};

// 获取本地化文本
export function getLocalizedText(content: unknown, locale: string): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  const localized = content as Record<string, string>;
  return localized[locale] || localized.en || "";
}

// 获取新闻列表
export async function getNews(options?: {
  limit?: number;
  categoryId?: string;
  published?: boolean;
}) {
  const { limit = 10, categoryId, published = true } = options || {};

  try {
    const news = await prisma.news.findMany({
      where: {
        ...(published !== undefined && { isPublished: published }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
      },
      orderBy: [
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
      take: limit,
    });
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// 获取新闻分类
export async function getNewsCategories() {
  try {
    const categories = await prisma.newsCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { news: true },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching news categories:", error);
    return [];
  }
}

// 获取产品列表
export async function getProducts(options?: {
  limit?: number;
  categoryId?: string;
  active?: boolean;
}) {
  const { limit = 20, categoryId, active = true } = options || {};

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(active !== undefined && { isActive: active }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
      },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
      take: limit,
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// 获取产品分类
export async function getProductCategories() {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
}

// 获取项目列表
export async function getProjects(options?: {
  limit?: number;
  active?: boolean;
}) {
  const { limit = 20, active = true } = options || {};

  try {
    const projects = await prisma.project.findMany({
      where: {
        ...(active !== undefined && { isActive: active }),
      },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
      take: limit,
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// 获取时间线
export async function getTimeline() {
  try {
    const timeline = await prisma.timeline.findMany({
      orderBy: { order: "asc" },
    });
    return timeline;
  } catch (error) {
    console.error("Error fetching timeline:", error);
    return [];
  }
}

// 获取团队成员
export async function getTeamMembers(options?: { active?: boolean }) {
  const { active = true } = options || {};

  try {
    const team = await prisma.teamMember.findMany({
      where: {
        ...(active !== undefined && { isActive: active }),
      },
      orderBy: { order: "asc" },
    });
    return team;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

// 获取公司信息
export async function getCompanyInfo(key?: string) {
  try {
    if (key) {
      const info = await prisma.companyInfo.findUnique({
        where: { key },
      });
      return info?.value || null;
    }

    const allInfo = await prisma.companyInfo.findMany();
    const infoObj: Record<string, unknown> = {};
    for (const info of allInfo) {
      infoObj[info.key] = info.value;
    }
    return infoObj;
  } catch (error) {
    console.error("Error fetching company info:", error);
    return key ? null : {};
  }
}

// 获取Banner
export async function getBanners(options?: { active?: boolean }) {
  const { active = true } = options || {};

  try {
    const banners = await prisma.banner.findMany({
      where: {
        ...(active !== undefined && { isActive: active }),
      },
      orderBy: { order: "asc" },
    });
    return banners;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

// 获取设置
export async function getSettings(key?: string) {
  try {
    if (key) {
      const setting = await prisma.setting.findUnique({
        where: { key },
      });
      return setting?.value || null;
    }

    const allSettings = await prisma.setting.findMany();
    const settingsObj: Record<string, unknown> = {};
    for (const setting of allSettings) {
      settingsObj[setting.key] = setting.value;
    }
    return settingsObj;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return key ? null : {};
  }
}

// 获取仪表盘统计
export async function getDashboardStats() {
  try {
    const [
      newsCount,
      productsCount,
      projectsCount,
      unreadMessagesCount,
    ] = await Promise.all([
      prisma.news.count({ where: { isPublished: true } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.project.count({ where: { isActive: true } }),
      prisma.message.count({ where: { isRead: false } }),
    ]);

    return {
      news: newsCount,
      products: productsCount,
      projects: projectsCount,
      unreadMessages: unreadMessagesCount,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      news: 0,
      products: 0,
      projects: 0,
      unreadMessages: 0,
    };
  }
}
