"use client";

import { useTranslations } from "next-intl";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";

export default function AdminCompanyPage() {
  const t = useTranslations("admin");

  const timeline = [
    { id: "1", year: "2024", title: "Expansion & Growth" },
    { id: "2", year: "2023", title: "Strategic Partnerships" },
    { id: "3", year: "2022", title: "Technology Innovation" },
    { id: "4", year: "2021", title: "Market Entry" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("company")}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage company information</p>
        </div>
        <Button><Save className="mr-2 h-4 w-4" />Save Changes</Button>
      </div>

      {/* Company Overview */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Company Overview</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Description (English)</label>
            <Textarea rows={4} defaultValue="Kunlun Digital Technology (KLD) Algeria is a subsidiary of China National Petroleum Corporation..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mission Statement</label>
            <Textarea rows={2} defaultValue="To empower Algeria's energy sector with cutting-edge digital technology solutions..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vision Statement</label>
            <Textarea rows={2} defaultValue="To be the leading digital technology partner for the oil and gas industry in North Africa..." />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Company Timeline</h2>
          <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" />Add Milestone</Button>
        </div>
        <div className="p-6 space-y-4">
          {timeline.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
              <div className="w-20">
                <Input defaultValue={item.year} className="text-center font-bold" />
              </div>
              <div className="flex-1">
                <Input defaultValue={item.title} />
              </div>
              <button className="p-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
              <Input defaultValue="123 Business District, Algiers, Algeria" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
              <Input defaultValue="+213 123 456 789" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <Input defaultValue="info@kld-algeria.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Working Hours</label>
              <Input defaultValue="Sunday - Thursday: 8:00 AM - 5:00 PM" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
