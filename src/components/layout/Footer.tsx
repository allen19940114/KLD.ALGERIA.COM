"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/services`, label: tNav("services") },
    { href: `/${locale}/products`, label: tNav("products") },
    { href: `/${locale}/projects`, label: tNav("projects") },
    { href: `/${locale}/news`, label: tNav("news") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">KLD</span>
              <span className="text-sm font-medium text-gray-400">Algeria</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("description")}
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Digital Solutions
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Oil & Gas Technology
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Software Development
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  IT Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Algiers, Algeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+213123456789"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +213 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@kld-algeria.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  info@kld-algeria.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              {t("copyright", { year: currentYear })}
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                {t("privacy")}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
