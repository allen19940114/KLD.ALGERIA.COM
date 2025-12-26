"use client";

import { useTranslations } from "next-intl";
import { Save, User, Lock, Globe, Palette } from "lucide-react";
import { Button, Input } from "@/components/ui";

export default function AdminSettingsPage() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("settings")}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage system settings</p>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <Input defaultValue="Admin User" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <Input type="email" defaultValue="admin@kld-algeria.com" />
            </div>
          </div>
          <Button><Save className="mr-2 h-4 w-4" />Update Profile</Button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center gap-3">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
            <Input type="password" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
              <Input type="password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
              <Input type="password" />
            </div>
          </div>
          <Button><Save className="mr-2 h-4 w-4" />Change Password</Button>
        </div>
      </div>

      {/* Site Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Site Settings</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Name</label>
              <Input defaultValue="KLD Algeria" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Language</label>
              <select className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Description</label>
            <Input defaultValue="Digital Intelligence Solutions for Oil & Gas Industry" />
          </div>
          <Button><Save className="mr-2 h-4 w-4" />Save Settings</Button>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center gap-3">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
            <div className="flex items-center gap-4">
              <input type="color" defaultValue="#0066CC" className="w-12 h-12 rounded cursor-pointer" />
              <Input defaultValue="#0066CC" className="w-32" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500">Enable dark mode for admin panel</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
