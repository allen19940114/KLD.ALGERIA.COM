"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { Button, Input } from "@/components/ui";

interface NewsCategory {
  id: string;
  name: Record<string, string>;
  slug: string;
}

interface NewsItem {
  id: string;
  title: Record<string, string>;
  slug: string;
  isPublished: boolean;
  publishedAt: string | null;
  viewCount: number;
  createdAt: string;
  category: NewsCategory | null;
}

interface NewsResponse {
  data: NewsItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AdminNewsPage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", "10");
      if (selectedCategory) params.append("categoryId", selectedCategory);
      if (selectedStatus) params.append("published", selectedStatus === "published" ? "true" : "false");

      const res = await fetch(`/api/news?${params.toString()}`);
      const data: NewsResponse = await res.json();
      setNews(data.data);
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/news/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNews();
  }, [pagination.page, selectedCategory, selectedStatus]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleTogglePublish = async (item: NewsItem) => {
    try {
      const res = await fetch(`/api/news/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, isPublished: !item.isPublished }),
      });
      if (res.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const getLocalizedText = (content: Record<string, string> | null | undefined) => {
    if (!content) return "";
    return content[locale] || content.en || "";
  };

  const getIntlLocale = (loc: string) => {
    const localeMap: Record<string, string> = {
      zh: "zh-CN",
      en: "en-US",
      fr: "fr-FR",
      ar: "ar-SA",
    };
    return localeMap[loc] || loc;
  };

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    try {
      return new Intl.DateTimeFormat(getIntlLocale(locale), {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(date));
    } catch {
      return new Date(date).toLocaleDateString();
    }
  };

  const filteredNews = news.filter(item =>
    getLocalizedText(item.title).toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchNews} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button asChild>
            <Link href={`/${locale}/admin/news/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Add News
            </Link>
          </Button>
        </div>
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
          <select
            className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {getLocalizedText(cat.name)}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : (
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
                {filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No news articles found
                    </td>
                  </tr>
                ) : (
                  filteredNews.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {getLocalizedText(item.title)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.category ? getLocalizedText(item.category.name) : "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className="focus:outline-none"
                        >
                          {item.isPublished ? (
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
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(item.publishedAt || item.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.viewCount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/${locale}/news/${item.slug}`}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            target="_blank"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/${locale}/admin/news/${item.id}/edit`}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredNews.length} of {pagination.total} results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page <= 1}
              className="px-3 py-1 rounded border dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setPagination(prev => ({ ...prev, page }))}
                className={`px-3 py-1 rounded text-sm ${
                  pagination.page === page
                    ? "bg-primary text-white"
                    : "border dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= pagination.totalPages}
              className="px-3 py-1 rounded border dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
