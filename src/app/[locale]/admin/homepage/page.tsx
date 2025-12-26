"use client";

import { useTranslations } from "next-intl";
import { Save, Plus, GripVertical, Trash2, Edit, Image as ImageIcon } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";

export default function AdminHomepagePage() {
  const t = useTranslations("admin");

  const banners = [
    { id: "1", title: "Digital Intelligence Solutions", subtitle: "Transform your operations", order: 1 },
    { id: "2", title: "Oil & Gas Technology", subtitle: "Industry-leading solutions", order: 2 },
    { id: "3", title: "Partnership for Success", subtitle: "Your trusted technology partner", order: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("homepage")}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage homepage content and banners</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />Save Changes
        </Button>
      </div>

      {/* Banner Management */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Hero Banners</h2>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />Add Banner
          </Button>
        </div>
        <div className="p-6 space-y-4">
          {banners.map((banner) => (
            <div key={banner.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
              <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{banner.title}</p>
                <p className="text-sm text-gray-500">{banner.subtitle}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700"><Edit className="h-4 w-4" /></button>
                <button className="p-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Hero Section Text</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title (English)</label>
              <Input defaultValue="KLD Algeria" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title (Arabic)</label>
              <Input defaultValue="كي إل دي الجزائر" dir="rtl" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle (English)</label>
              <Input defaultValue="Digital Intelligence Solutions" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle (Arabic)</label>
              <Input defaultValue="حلول الذكاء الرقمي" dir="rtl" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description (English)</label>
            <Textarea rows={3} defaultValue="Leading provider of digital technology solutions in Algeria..." />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">About Section</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Section Title</label>
            <Input defaultValue="About KLD Algeria" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
            <Textarea rows={4} defaultValue="Kunlun Digital Technology (KLD) Algeria is a subsidiary of China National Petroleum Corporation..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Section Image</label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <Button variant="outline">Change Image</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
