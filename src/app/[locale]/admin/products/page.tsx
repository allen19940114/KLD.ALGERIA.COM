"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Plus, Search, Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";
import { Button, Input } from "@/components/ui";

export default function AdminProductsPage() {
  const t = useTranslations("admin");
  const locale = useLocale();

  const products = [
    { id: "1", name: "KLD Production Suite", category: "Production Management", status: "active", order: 1 },
    { id: "2", name: "KLD Analytics Platform", category: "Data Analytics", status: "active", order: 2 },
    { id: "3", name: "KLD SCADA System", category: "Production Management", status: "active", order: 3 },
    { id: "4", name: "KLD Safety Manager", category: "Safety & Compliance", status: "active", order: 4 },
    { id: "5", name: "KLD Asset Tracker", category: "Asset Management", status: "inactive", order: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("products")}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage products and services</p>
        </div>
        <Button asChild>
          <Link href={`/${locale}/admin/products/new`}>
            <Plus className="mr-2 h-4 w-4" />Add Product
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search products..." className="pl-10" />
          </div>
          <select className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800">
            <option value="">All Categories</option>
            <option value="production">Production Management</option>
            <option value="analytics">Data Analytics</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-800">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Category</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Order</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.category}</td>
                <td className="px-6 py-4">
                  {item.status === "active" ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3" />Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                      <XCircle className="h-3 w-3" />Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.order}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700"><Eye className="h-4 w-4" /></button>
                    <button className="p-2 text-gray-500 hover:text-gray-700"><Edit className="h-4 w-4" /></button>
                    <button className="p-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
