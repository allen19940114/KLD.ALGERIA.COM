import { useTranslations } from "next-intl";
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

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AdminDashboardContent locale={locale} />;
}

function AdminDashboardContent({ locale }: { locale: string }) {
  const t = useTranslations("admin");

  const stats = [
    {
      title: t("stats.totalNews"),
      value: "24",
      change: "+3 this month",
      icon: Newspaper,
      color: "bg-blue-500",
      href: `/${locale}/admin/news`,
    },
    {
      title: t("stats.totalProducts"),
      value: "12",
      change: "+2 this month",
      icon: Package,
      color: "bg-green-500",
      href: `/${locale}/admin/products`,
    },
    {
      title: t("stats.totalProjects"),
      value: "8",
      change: "+1 this month",
      icon: FolderKanban,
      color: "bg-purple-500",
      href: `/${locale}/admin/projects`,
    },
    {
      title: t("stats.unreadMessages"),
      value: "5",
      change: "2 urgent",
      icon: MessageSquare,
      color: "bg-orange-500",
      href: `/${locale}/admin/messages`,
    },
  ];

  const recentActivity = [
    {
      action: "New message received",
      description: "From: John Doe - Inquiry about SCADA solutions",
      time: "5 minutes ago",
    },
    {
      action: "News article published",
      description: "KLD Algeria Expands Operations",
      time: "2 hours ago",
    },
    {
      action: "Product updated",
      description: "KLD Production Suite - New features added",
      time: "1 day ago",
    },
    {
      action: "Project case added",
      description: "Digital Oilfield Transformation - Hassi Messaoud",
      time: "2 days ago",
    },
  ];

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
        {stats.map((stat, index) => (
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
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
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
            Website Statistics
          </h2>
        </div>
        <div className="p-6">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">+15%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                12,345
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page Views (This Month)
              </p>
            </div>
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-blue-500 mb-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">+8%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                2,456
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unique Visitors
              </p>
            </div>
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-purple-500 mb-2">
                <Eye className="h-5 w-5" />
                <span className="text-sm font-medium">3.2 min</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                4.5
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Pages/Visit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
