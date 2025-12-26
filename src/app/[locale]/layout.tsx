import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale, getDirection } from "@/i18n/config";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "KLD Algeria - Digital Intelligence Solutions",
    template: "%s | KLD Algeria",
  },
  description:
    "Kunlun Digital Technology Algeria - Leading provider of digital technology solutions for the oil & gas industry in Algeria.",
  keywords: [
    "KLD",
    "Kunlun Digital",
    "Algeria",
    "Oil & Gas",
    "Digital Solutions",
    "Technology",
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = getDirection(locale as Locale);

  return (
    <html lang={locale} dir={direction}>
      <body className="min-h-screen bg-white dark:bg-gray-950 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
