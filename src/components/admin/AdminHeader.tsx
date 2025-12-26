"use client";

import { useTranslations } from "next-intl";
import { Bell, Menu, User } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const t = useTranslations("admin");

  return (
    <header className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex items-center justify-between px-6">
      {/* Mobile menu button */}
      <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <Menu className="h-6 w-6" />
      </button>

      {/* Welcome message */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("welcome")}, {user.name || user.email}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* User menu */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
