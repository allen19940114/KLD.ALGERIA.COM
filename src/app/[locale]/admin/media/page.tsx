"use client";

import { useState, useEffect, useRef } from "react";
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
  RefreshCw,
} from "lucide-react";
import { Input, Button } from "@/components/ui";

interface MediaItem {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  url: string;
  type: string;
  createdAt: string;
}

interface MediaResponse {
  data: MediaItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  storage: {
    used: number;
    total: number;
  };
}

export default function AdminMediaPage() {
  const t = useTranslations("admin");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copied, setCopied] = useState<string | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [storage, setStorage] = useState({ used: 0, total: 1073741824 }); // 1GB default
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", "24");
      if (typeFilter) params.append("type", typeFilter);

      const res = await fetch(`/api/media?${params.toString()}`);
      const data: MediaResponse = await res.json();
      setMedia(data.data);
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
      if (data.storage) {
        setStorage(data.storage);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [pagination.page, typeFilter]);

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        await fetch("/api/media", {
          method: "POST",
          body: formData,
        });
      }
      fetchMedia();
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchMedia();
      }
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const getMediaType = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    return "document";
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

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const filteredMedia = media.filter((item) =>
    (item.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const storagePercent = Math.round((storage.used / storage.total) * 100);

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchMedia} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf"
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 flex-1 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
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
      <div
        className="bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed dark:border-gray-700 p-8"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className={`h-12 w-12 mx-auto text-gray-400 mb-4 ${uploading ? "animate-bounce" : ""}`} />
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            {uploading ? "Uploading files..." : "Drag and drop files here"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse from your computer
          </p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            Browse Files
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            Supported formats: JPG, PNG, GIF, PDF, MP4 (Max 10MB)
          </p>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No media files found
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredMedia.map((item) => {
              const type = getMediaType(item.mimeType);
              const Icon = getIcon(type);
              return (
                <div
                  key={item.id}
                  className="group relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-square"
                >
                  {type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
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
                    <a
                      href={item.url}
                      download={item.name}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4 text-gray-700" />
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
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
              {filteredMedia.map((item) => {
                const type = getMediaType(item.mimeType);
                const Icon = getIcon(type);
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
                      {type}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {formatSize(item.size)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {formatDate(item.createdAt)}
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
                        <a
                          href={item.url}
                          download={item.name}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
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
          <span className="text-gray-600 dark:text-gray-400">Used: {formatSize(storage.used)}</span>
          <span className="text-gray-600 dark:text-gray-400">Total: {formatSize(storage.total)}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${storagePercent}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {storagePercent}% of storage used
        </p>
      </div>
    </div>
  );
}
