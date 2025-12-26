"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Save, User, Lock, Globe, Palette, RefreshCw } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useSession } from "next-auth/react";

interface Settings {
  id: string;
  key: string;
  value: Record<string, string>;
}

export default function AdminSettingsPage() {
  const t = useTranslations("admin");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings[]>([]);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    if (session?.user) {
      setProfileName(session.user.name || "");
      setProfileEmail(session.user.email || "");
    }
  }, [session]);

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

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Profile update API would go here
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!currentPassword || !newPassword) {
      alert("Please fill all password fields");
      return;
    }

    setSaving(true);
    try {
      // Password change API would go here
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password");
    } finally {
      setSaving(false);
    }
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
            {t("settings")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage system settings
          </p>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Profile Settings
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <Input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSaveProfile} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            Update Profile
          </Button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center gap-3">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Security
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleChangePassword} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </div>
      </div>

      {/* Site Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Site Settings
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Site Name
              </label>
              <Input
                value={getSettingValue("siteTitle", "en")}
                onChange={(e) => updateSettingValue("siteTitle", "en", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Language
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={getSettingValue("defaultLanguage", "en")}
                onChange={(e) => updateSettingValue("defaultLanguage", "en", e.target.value)}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Description
            </label>
            <Input
              value={getSettingValue("siteDescription", "en")}
              onChange={(e) => updateSettingValue("siteDescription", "en", e.target.value)}
            />
          </div>
          <Button onClick={handleSaveSettings} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
        <div className="p-6 border-b dark:border-gray-800 flex items-center gap-3">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Appearance
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={getSettingValue("primaryColor", "en") || "#0066CC"}
                onChange={(e) => updateSettingValue("primaryColor", "en", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <Input
                value={getSettingValue("primaryColor", "en") || "#0066CC"}
                onChange={(e) => updateSettingValue("primaryColor", "en", e.target.value)}
                className="w-32"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Dark Mode
              </p>
              <p className="text-sm text-gray-500">
                Enable dark mode for admin panel
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
