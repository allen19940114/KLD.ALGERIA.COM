import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Newspaper,
  Package,
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Users,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { prisma } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return {
    title: t("dashboard"),
  };
}

async function getDashboardStats() {
  try {
    const [
      newsCount,
      productsCount,
      projectsCount,
      unreadMessagesCount,
      recentNews,
      recentMessages,
    ] = await Promise.all([
      prisma.news.count(),
      prisma.product.count(),
      prisma.project.count(),
      prisma.message.count({ where: { isRead: false } }),
      prisma.news.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
      prisma.message.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      newsCount,
      productsCount,
      projectsCount,
      unreadMessagesCount,
      recentNews,
      recentMessages,
    };
  } catch {
    return {
      newsCount: 0,
      productsCount: 0,
      projectsCount: 0,
      unreadMessagesCount: 0,
      recentNews: [],
      recentMessages: [],
    };
  }
}

function getLocalizedText(content: unknown, locale: string): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  const localized = content as Record<string, string>;
  return localized[locale] || localized.en || "";
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: t("stats.totalNews"),
      value: stats.newsCount.toString(),
      change: `${stats.newsCount} total`,
      icon: Newspaper,
      color: "bg-blue-500",
      href: `/${locale}/admin/news`,
    },
    {
      title: t("stats.totalProducts"),
      value: stats.productsCount.toString(),
      change: `${stats.productsCount} total`,
      icon: Package,
      color: "bg-green-500",
      href: `/${locale}/admin/products`,
    },
    {
      title: t("stats.totalProjects"),
      value: stats.projectsCount.toString(),
      change: `${stats.projectsCount} total`,
      icon: FolderKanban,
      color: "bg-purple-500",
      href: `/${locale}/admin/projects`,
    },
    {
      title: t("stats.unreadMessages"),
      value: stats.unreadMessagesCount.toString(),
      change: stats.unreadMessagesCount > 0 ? "Needs attention" : "All read",
      icon: MessageSquare,
      color: "bg-orange-500",
      href: `/${locale}/admin/messages`,
    },
  ];

  // Build recent activity from real data
  const recentActivity: Array<{
    action: string;
    description: string;
    time: string;
  }> = [];

  for (const news of stats.recentNews) {
    recentActivity.push({
      action: news.isPublished ? "News article published" : "News draft saved",
      description: getLocalizedText(news.title, locale),
      time: formatTimeAgo(new Date(news.createdAt)),
    });
  }

  for (const message of stats.recentMessages) {
    recentActivity.push({
      action: "New message received",
      description: `From: ${message.name} - ${message.subject}`,
      time: formatTimeAgo(new Date(message.createdAt)),
    });
  }

  // Sort by time (most recent first)
  recentActivity.sort((a, b) => {
    // Simple comparison for "Just now", "X minutes ago", etc.
    return a.time.localeCompare(b.time);
  });

  const quickActions = [
    { label: "Add News", href: `/${locale}/admin/news/new`, icon: Newspaper },
    { label: "Add Product", href: `/${locale}/admin/products/new`, icon: Package },
    { label: "Add Project", href: `/${locale}/admin/projects/new`, icon: FolderKanban },
    { label: "View Messages", href: `/${locale}/admin/messages`, icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("dashboard")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your website content and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 border dark:border-gray-800 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
          <div className="p-6 border-b dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            {recentActivity.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No recent activity
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.slice(0, 5).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b dark:border-gray-800 last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
          <div className="p-6 border-b dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {action.label}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Website Stats */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Content Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Active</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.newsCount + stats.productsCount + stats.projectsCount}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Content Items
              </p>
            </div>
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-blue-500 mb-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Messages</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.unreadMessagesCount}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unread Messages
              </p>
            </div>
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-purple-500 mb-2">
                <Eye className="h-5 w-5" />
                <span className="text-sm font-medium">Categories</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                4
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Supported Languages
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
