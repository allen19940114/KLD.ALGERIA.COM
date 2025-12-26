"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft, Save, RefreshCw, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
];

interface NewsFormData {
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  slug: string;
  image: string;
  categoryId: string;
  isPublished: boolean;
}

interface Category {
  id: string;
  name: Record<string, string>;
}

export default function EditNewsPage() {
  const t = useTranslations("admin");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("en");
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<NewsFormData>({
    title: { en: "", zh: "", fr: "", ar: "" },
    excerpt: { en: "", zh: "", fr: "", ar: "" },
    content: { en: "", zh: "", fr: "", ar: "" },
    slug: "",
    image: "",
    categoryId: "",
    isPublished: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, categoriesRes] = await Promise.all([
          fetch(`/api/news/${id}`),
          fetch("/api/news/categories"),
        ]);

        if (newsRes.ok) {
          const news = await newsRes.json();
          setFormData({
            title: news.title || { en: "", zh: "", fr: "", ar: "" },
            excerpt: news.excerpt || { en: "", zh: "", fr: "", ar: "" },
            content: news.content || { en: "", zh: "", fr: "", ar: "" },
            slug: news.slug || "",
            image: news.image || "",
            categoryId: news.categoryId || "",
            isPublished: news.isPublished || false,
          });
        }

        if (categoriesRes.ok) {
          const cats = await categoriesRes.json();
          setCategories(cats);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push(`/${locale}/admin/news`);
      } else {
        const error = await res.json();
        alert(error.error || "Failed to update news");
      }
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Failed to update news");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this news article?")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push(`/${locale}/admin/news`);
      } else {
        alert("Failed to delete news");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/admin/news`}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit News
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Modify news article details
            </p>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
          <div className="border-b dark:border-gray-800">
            <div className="flex">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setActiveTab(lang.code)}
                  className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === lang.code
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title ({activeTab.toUpperCase()})
              </label>
              <Input
                value={formData.title[activeTab] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: { ...formData.title, [activeTab]: e.target.value },
                  })
                }
                placeholder="Enter news title"
                required={activeTab === "en"}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt ({activeTab.toUpperCase()})
              </label>
              <textarea
                value={formData.excerpt[activeTab] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    excerpt: { ...formData.excerpt, [activeTab]: e.target.value },
                  })
                }
                placeholder="Brief summary of the news"
                rows={2}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content ({activeTab.toUpperCase()})
              </label>
              <textarea
                value={formData.content[activeTab] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, [activeTab]: e.target.value },
                  })
                }
                placeholder="Full news content"
                rows={10}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Meta Information */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Meta Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug
              </label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="news-url-slug"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name[locale] || cat.name.en || "Untitled"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <Input
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) =>
                setFormData({ ...formData, isPublished: e.target.checked })
              }
              className="w-4 h-4 rounded border-gray-300"
            />
            <label
              htmlFor="isPublished"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Published
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/admin/news`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
