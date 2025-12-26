export const locales = ["ar", "fr", "en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  fr: "Français",
  en: "English",
  zh: "中文",
};

export const localeFlags: Record<Locale, string> = {
  ar: "🇩🇿",
  fr: "🇫🇷",
  en: "🇬🇧",
  zh: "🇨🇳",
};

// RTL languages
export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return isRtl(locale) ? "rtl" : "ltr";
}
