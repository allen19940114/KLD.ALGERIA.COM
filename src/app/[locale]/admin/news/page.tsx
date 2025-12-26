"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button, Input } from "@/components/ui";

export default function AdminNewsPage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");

  const news = [
    {
      id: "1",
      title: "KLD Algeria Expands Operations",
      category: "Company Updates",
      status: "published",
      date: "2025-12-20",
      views: 1234,
    },
    {
      id: "2",
      title: "Strategic Partnership with Sonatrach",
      category: "Company Updates",
      status: "published",
      date: "2025-12-15",
      views: 856,
    },
    {
      id: "3",
      title: "Innovation Award 2025",
      category: "Company Updates",
      status: "published",
      date: "2025-12-10",
      views: 654,
    },
    {
      id: "4",
      title: "New AI Platform Launch",
      category: "Technology",
      status: "draft",
      date: "2025-12-08",
      views: 0,
    },
    {
      id: "5",
      title: "Cybersecurity Best Practices",
      category: "Technology",
      status: "published",
      date: "2025-11-28",
      views: 432,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("news")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage news articles and announcements
          </p>
        </div>
        <Button asChild>
          <Link href={`/${locale}/admin/news/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add News
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option value="">All Categories</option>
            <option value="company">Company Updates</option>
            <option value="technology">Technology</option>
            <option value="events">Events</option>
          </select>
          <select className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-800">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Views
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr
                  key={item.id}
                  className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === "published" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                        <XCircle className="h-3 w-3" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing 1-5 of 24 results
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-primary text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 rounded border dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              2
            </button>
            <button className="px-3 py-1 rounded border dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              3
            </button>
            <button className="px-3 py-1 rounded border dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
