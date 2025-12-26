"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Upload,
  Search,
  Grid,
  List,
  Image as ImageIcon,
  File,
  Video,
  Trash2,
  Download,
  Copy,
  Check,
} from "lucide-react";
import { Input, Button } from "@/components/ui";

export default function AdminMediaPage() {
  const t = useTranslations("admin");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copied, setCopied] = useState<string | null>(null);

  const media = [
    {
      id: "1",
      name: "hero-banner.jpg",
      type: "image",
      size: "2.4 MB",
      url: "/uploads/hero-banner.jpg",
      date: "2025-12-20",
    },
    {
      id: "2",
      name: "company-building.jpg",
      type: "image",
      size: "1.8 MB",
      url: "/uploads/company-building.jpg",
      date: "2025-12-18",
    },
    {
      id: "3",
      name: "project-case-1.jpg",
      type: "image",
      size: "1.2 MB",
      url: "/uploads/project-case-1.jpg",
      date: "2025-12-15",
    },
    {
      id: "4",
      name: "team-photo.jpg",
      type: "image",
      size: "3.1 MB",
      url: "/uploads/team-photo.jpg",
      date: "2025-12-12",
    },
    {
      id: "5",
      name: "product-brochure.pdf",
      type: "document",
      size: "5.6 MB",
      url: "/uploads/product-brochure.pdf",
      date: "2025-12-10",
    },
    {
      id: "6",
      name: "company-intro.mp4",
      type: "video",
      size: "45.2 MB",
      url: "/uploads/company-intro.mp4",
      date: "2025-12-08",
    },
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon;
      case "video":
        return Video;
      default:
        return File;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("media")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage media files
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 flex-1 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                className="pl-10"
              />
            </div>
            <select className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed dark:border-gray-700 p-8">
        <div className="text-center">
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Drag and drop files here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse from your computer
          </p>
          <Button variant="outline">
            Browse Files
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            Supported formats: JPG, PNG, GIF, PDF, MP4 (Max 10MB)
          </p>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {media.map((item) => {
              const Icon = getIcon(item.type);
              return (
                <div
                  key={item.id}
                  className="group relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-square"
                >
                  {item.type === "image" ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Icon className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500 truncate px-2">
                        {item.name}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopy(item.url)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      title="Copy URL"
                    >
                      {copied === item.url ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-700" />
                      )}
                    </button>
                    <button
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-800">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Size
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {media.map((item) => {
                const Icon = getIcon(item.type);
                return (
                  <tr
                    key={item.id}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 capitalize">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {item.size}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {item.date}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopy(item.url)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          {copied === item.url ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Storage Info */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Storage Usage
        </h3>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Used: 58.3 MB</span>
          <span className="text-gray-600 dark:text-gray-400">Total: 1 GB</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[6%]" />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          5.8% of storage used
        </p>
      </div>
    </div>
  );
}
