"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Newspaper,
  Package,
  FolderKanban,
  Home,
  Building2,
  MessageSquare,
  Image,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  locale: string;
}

export function AdminSidebar({ locale }: AdminSidebarProps) {
  const t = useTranslations("admin");
  const pathname = usePathname();

  const menuItems = [
    {
      href: `/${locale}/admin`,
      icon: LayoutDashboard,
      label: t("dashboard"),
    },
    {
      href: `/${locale}/admin/news`,
      icon: Newspaper,
      label: t("news"),
    },
    {
      href: `/${locale}/admin/products`,
      icon: Package,
      label: t("products"),
    },
    {
      href: `/${locale}/admin/projects`,
      icon: FolderKanban,
      label: t("projects"),
    },
    {
      href: `/${locale}/admin/homepage`,
      icon: Home,
      label: t("homepage"),
    },
    {
      href: `/${locale}/admin/company`,
      icon: Building2,
      label: t("company"),
    },
    {
      href: `/${locale}/admin/messages`,
      icon: MessageSquare,
      label: t("messages"),
    },
    {
      href: `/${locale}/admin/media`,
      icon: Image,
      label: t("media"),
    },
    {
      href: `/${locale}/admin/settings`,
      icon: Settings,
      label: t("settings"),
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 hidden lg:block">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b dark:border-gray-800">
        <Link href={`/${locale}/admin`} className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">KLD</span>
          <span className="text-sm font-medium text-gray-500">Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== `/${locale}/admin` && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {t("logout")}
          </button>
        </form>
      </div>
    </aside>
  );
}
