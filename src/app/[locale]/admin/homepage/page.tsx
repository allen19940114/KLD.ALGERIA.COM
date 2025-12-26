"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Save, Plus, GripVertical, Trash2, Edit, Image as ImageIcon, RefreshCw } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";

interface Banner {
  id: string;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  image: string | null;
  link: string | null;
  order: number;
  isActive: boolean;
}

interface Settings {
  id: string;
  key: string;
  value: Record<string, string>;
}

export default function AdminHomepagePage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [settings, setSettings] = useState<Settings[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bannersRes, settingsRes] = await Promise.all([
        fetch("/api/banners"),
        fetch("/api/settings"),
      ]);
      const bannersData = await bannersRes.json();
      const settingsData = await settingsRes.json();
      setBanners(bannersData);
      setSettings(settingsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getSettingValue = (key: string, lang: string = "en") => {
    const item = settings.find((s) => s.key === key);
    if (!item) return "";
    return item.value[lang] || item.value.en || "";
  };

  const updateSettingValue = (key: string, lang: string, value: string) => {
    setSettings((prev) => {
      const existing = prev.find((s) => s.key === key);
      if (existing) {
        return prev.map((s) =>
          s.key === key
            ? { ...s, value: { ...s.value, [lang]: value } }
            : s
        );
      }
      return [...prev, { id: "", key, value: { [lang]: value } }];
    });
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const handleAddBanner = async () => {
    try {
      const newBanner = {
        title: { en: "New Banner", ar: "بانر جديد", fr: "Nouvelle bannière", zh: "新横幅" },
        subtitle: { en: "Subtitle", ar: "العنوان الفرعي", fr: "Sous-titre", zh: "副标题" },
        order: banners.length,
        isActive: true,
      };

      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBanner),
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error adding banner:", error);
    }
  };

  const handleSaveBanner = async () => {
    if (!editingBanner) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/banners/${editingBanner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBanner),
      });

      if (res.ok) {
        setEditingBanner(null);
        fetchData();
      }
    } catch (error) {
      console.error("Error saving banner:", error);
    } finally {
      setSaving(false);
    }
  };

  const getLocalizedText = (content: Record<string, string> | null | undefined) => {
    if (!content) return "";
    return content[locale] || content.en || "";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("homepage")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage homepage content and banners
          </p>
        </div>
        <Button onClick={handleSaveSettings} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Banner Management */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Hero Banners
          </h2>
          <Button variant="outline" size="sm" onClick={handleAddBanner}>
            <Plus className="mr-2 h-4 w-4" />
            Add Banner
          </Button>
        </div>
        <div className="p-6 space-y-4">
          {banners.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No banners. Click &quot;Add Banner&quot; to create one.
            </p>
          ) : (
            banners.map((banner) => (
              <div
                key={banner.id}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                  {banner.image ? (
                    <img src={banner.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {getLocalizedText(banner.title)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {getLocalizedText(banner.subtitle)}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    banner.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {banner.isActive ? "Active" : "Inactive"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingBanner(banner)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Banner Modal */}
      {editingBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Banner
              </h2>
              <button
                onClick={() => setEditingBanner(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title (English)
                  </label>
                  <Input
                    value={editingBanner.title.en || ""}
                    onChange={(e) =>
                      setEditingBanner({
                        ...editingBanner,
                        title: { ...editingBanner.title, en: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title (Arabic)
                  </label>
                  <Input
                    dir="rtl"
                    value={editingBanner.title.ar || ""}
                    onChange={(e) =>
                      setEditingBanner({
                        ...editingBanner,
                        title: { ...editingBanner.title, ar: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subtitle (English)
                  </label>
                  <Input
                    value={editingBanner.subtitle.en || ""}
                    onChange={(e) =>
                      setEditingBanner({
                        ...editingBanner,
                        subtitle: { ...editingBanner.subtitle, en: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subtitle (Arabic)
                  </label>
                  <Input
                    dir="rtl"
                    value={editingBanner.subtitle.ar || ""}
                    onChange={(e) =>
                      setEditingBanner({
                        ...editingBanner,
                        subtitle: { ...editingBanner.subtitle, ar: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL
                </label>
                <Input
                  value={editingBanner.image || ""}
                  onChange={(e) =>
                    setEditingBanner({ ...editingBanner, image: e.target.value })
                  }
                  placeholder="/uploads/banner.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link URL
                </label>
                <Input
                  value={editingBanner.link || ""}
                  onChange={(e) =>
                    setEditingBanner({ ...editingBanner, link: e.target.value })
                  }
                  placeholder="/products"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editingBanner.isActive}
                  onChange={(e) =>
                    setEditingBanner({ ...editingBanner, isActive: e.target.checked })
                  }
                  className="rounded"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
                  Active
                </label>
              </div>
            </div>
            <div className="p-6 border-t dark:border-gray-800 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingBanner(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveBanner} disabled={saving}>
                {saving ? "Saving..." : "Save Banner"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Hero Section Text
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Site Title (English)
              </label>
              <Input
                value={getSettingValue("siteTitle", "en")}
                onChange={(e) => updateSettingValue("siteTitle", "en", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Site Title (Arabic)
              </label>
              <Input
                dir="rtl"
                value={getSettingValue("siteTitle", "ar")}
                onChange={(e) => updateSettingValue("siteTitle", "ar", e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tagline (English)
              </label>
              <Input
                value={getSettingValue("tagline", "en")}
                onChange={(e) => updateSettingValue("tagline", "en", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tagline (Arabic)
              </label>
              <Input
                dir="rtl"
                value={getSettingValue("tagline", "ar")}
                onChange={(e) => updateSettingValue("tagline", "ar", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Description (English)
            </label>
            <Textarea
              rows={3}
              value={getSettingValue("siteDescription", "en")}
              onChange={(e) => updateSettingValue("siteDescription", "en", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            About Section
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Title (English)
            </label>
            <Input
              value={getSettingValue("aboutTitle", "en")}
              onChange={(e) => updateSettingValue("aboutTitle", "en", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (English)
            </label>
            <Textarea
              rows={4}
              value={getSettingValue("aboutContent", "en")}
              onChange={(e) => updateSettingValue("aboutContent", "en", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
