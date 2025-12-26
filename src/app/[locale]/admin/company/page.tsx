"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Save, Plus, Trash2, GripVertical, RefreshCw } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";

interface CompanyInfo {
  id: string;
  key: string;
  value: Record<string, string>;
}

interface TimelineItem {
  id?: string;
  year: string;
  title: Record<string, string>;
  description?: Record<string, string>;
  order: number;
}

export default function AdminCompanyPage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [companyRes, timelineRes] = await Promise.all([
        fetch("/api/company"),
        fetch("/api/timeline"),
      ]);
      const companyData = await companyRes.json();
      const timelineData = await timelineRes.json();
      setCompanyInfo(companyData);
      setTimeline(timelineData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCompanyValue = (key: string, lang: string = "en") => {
    const item = companyInfo.find((c) => c.key === key);
    if (!item) return "";
    return item.value[lang] || item.value.en || "";
  };

  const updateCompanyValue = (key: string, lang: string, value: string) => {
    setCompanyInfo((prev) => {
      const existing = prev.find((c) => c.key === key);
      if (existing) {
        return prev.map((c) =>
          c.key === key
            ? { ...c, value: { ...c.value, [lang]: value } }
            : c
        );
      }
      return [...prev, { id: "", key, value: { [lang]: value } }];
    });
  };

  const handleSaveCompany = async () => {
    setSaving(true);
    try {
      for (const item of companyInfo) {
        await fetch("/api/company", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      alert("Company information saved successfully!");
    } catch (error) {
      console.error("Error saving company:", error);
      alert("Failed to save company information");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTimeline = async () => {
    setSaving(true);
    try {
      await fetch("/api/timeline", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: timeline }),
      });
      fetchData();
      alert("Timeline saved successfully!");
    } catch (error) {
      console.error("Error saving timeline:", error);
      alert("Failed to save timeline");
    } finally {
      setSaving(false);
    }
  };

  const addTimelineItem = () => {
    setTimeline((prev) => [
      ...prev,
      {
        year: new Date().getFullYear().toString(),
        title: { en: "", ar: "", fr: "", zh: "" },
        description: { en: "", ar: "", fr: "", zh: "" },
        order: prev.length,
      },
    ]);
  };

  const updateTimelineItem = (index: number, field: string, value: string) => {
    setTimeline((prev) =>
      prev.map((item, i) =>
        i === index
          ? field === "year"
            ? { ...item, year: value }
            : { ...item, title: { ...item.title, [field]: value } }
          : item
      )
    );
  };

  const removeTimelineItem = (index: number) => {
    setTimeline((prev) => prev.filter((_, i) => i !== index));
  };

  const getLocalizedText = (content: Record<string, string> | undefined) => {
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
            {t("company")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage company information
          </p>
        </div>
        <Button onClick={handleSaveCompany} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Company Overview */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Company Overview
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Description (English)
            </label>
            <Textarea
              rows={4}
              value={getCompanyValue("about", "en")}
              onChange={(e) => updateCompanyValue("about", "en", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Description (Arabic)
            </label>
            <Textarea
              rows={4}
              dir="rtl"
              value={getCompanyValue("about", "ar")}
              onChange={(e) => updateCompanyValue("about", "ar", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mission Statement (English)
            </label>
            <Textarea
              rows={2}
              value={getCompanyValue("mission", "en")}
              onChange={(e) => updateCompanyValue("mission", "en", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vision Statement (English)
            </label>
            <Textarea
              rows={2}
              value={getCompanyValue("vision", "en")}
              onChange={(e) => updateCompanyValue("vision", "en", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Company Timeline
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addTimelineItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
            <Button size="sm" onClick={handleSaveTimeline} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              Save Timeline
            </Button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {timeline.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No timeline items. Click &quot;Add Milestone&quot; to create one.
            </p>
          ) : (
            timeline.map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                <div className="w-20">
                  <Input
                    value={item.year}
                    onChange={(e) => updateTimelineItem(index, "year", e.target.value)}
                    className="text-center font-bold"
                    placeholder="Year"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={getLocalizedText(item.title)}
                    onChange={(e) => updateTimelineItem(index, locale, e.target.value)}
                    placeholder={`Title (${locale.toUpperCase()})`}
                  />
                </div>
                <button
                  onClick={() => removeTimelineItem(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contact Information
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <Input
                value={getCompanyValue("address", "en")}
                onChange={(e) => updateCompanyValue("address", "en", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <Input
                value={getCompanyValue("phone", "en")}
                onChange={(e) => updateCompanyValue("phone", "en", e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <Input
                value={getCompanyValue("email", "en")}
                onChange={(e) => updateCompanyValue("email", "en", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Working Hours
              </label>
              <Input
                value={getCompanyValue("workingHours", "en")}
                onChange={(e) => updateCompanyValue("workingHours", "en", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
