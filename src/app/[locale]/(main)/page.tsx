import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Cpu, Database, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui";
import { getNews, getProjects, getCompanyInfo, getLocalizedText } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("hero.title"),
    description: t("hero.description"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 获取真实数据
  const [news, projects, companyInfoRaw] = await Promise.all([
    getNews({ limit: 3 }),
    getProjects({ limit: 3 }),
    getCompanyInfo(),
  ]);
  const companyInfo = companyInfoRaw as Record<string, unknown> | null;

  return (
    <>
      <HeroSection />
      <ServicesSection locale={locale} />
      <AboutSection locale={locale} companyInfo={companyInfo} />
      <ProjectsSection locale={locale} projects={projects} />
      <NewsSection locale={locale} news={news} />
      <CTASection locale={locale} />
    </>
  );
}

function HeroSection() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");

  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-4">
            {t("subtitle")}
          </p>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              {tCommon("getStarted")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              {tCommon("learnMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ locale }: { locale: string }) {
  const t = useTranslations("home.services");
  const tCommon = useTranslations("common");

  const services = [
    {
      icon: Cpu,
      titleKey: "digital",
      descKey: "digitalDesc",
    },
    {
      icon: Database,
      titleKey: "data",
      descKey: "dataDesc",
    },
    {
      icon: Shield,
      titleKey: "security",
      descKey: "securityDesc",
    },
    {
      icon: Zap,
      titleKey: "automation",
      descKey: "automationDesc",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t(service.titleKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t(service.descKey)}
              </p>
              <Link
                href={`/${locale}/services`}
                className="text-primary font-medium inline-flex items-center hover:underline"
              >
                {tCommon("learnMore")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ locale, companyInfo }: { locale: string; companyInfo: Record<string, unknown> | null }) {
  const t = useTranslations("home.about");
  const tCommon = useTranslations("common");

  const aboutText = companyInfo?.about
    ? getLocalizedText(companyInfo.about, locale)
    : t("description");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {aboutText}
            </p>
            <ul className="space-y-3 mb-8">
              {[
                t("point1"),
                t("point2"),
                t("point3"),
                t("point4"),
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild>
              <Link href={`/${locale}/about`}>
                {tCommon("learnMore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-lg">Company Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Project {
  id: string;
  title: unknown;
  description: unknown;
  image: string | null;
  slug: string;
}

function ProjectsSection({ locale, projects }: { locale: string; projects: Project[] }) {
  const t = useTranslations("home.projects");
  const tCommon = useTranslations("common");

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={getLocalizedText(project.title, locale)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Project Image</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {getLocalizedText(project.title, locale)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {getLocalizedText(project.description, locale)}
                </p>
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  {tCommon("readMore")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link href={`/${locale}/projects`}>
              {tCommon("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface NewsItem {
  id: string;
  title: unknown;
  excerpt: unknown;
  publishedAt: Date | null;
  slug: string;
}

function NewsSection({ locale, news }: { locale: string; news: NewsItem[] }) {
  const t = useTranslations("home.news");
  const tCommon = useTranslations("common");

  const getIntlLocale = (loc: string) => {
    const localeMap: Record<string, string> = {
      zh: "zh-CN",
      en: "en-US",
      fr: "fr-FR",
      ar: "ar-SA",
    };
    return localeMap[loc] || loc;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    try {
      return new Intl.DateTimeFormat(getIntlLocale(locale), {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
    } catch {
      return new Date(date).toLocaleDateString();
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="border dark:border-gray-800 rounded-xl p-6 hover:border-primary transition-colors"
            >
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(item.publishedAt)}
              </time>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-2 mb-3">
                {getLocalizedText(item.title, locale)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {getLocalizedText(item.excerpt, locale)}
              </p>
              <Link
                href={`/${locale}/news/${item.slug}`}
                className="text-primary font-medium inline-flex items-center hover:underline"
              >
                {tCommon("readMore")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ locale }: { locale: string }) {
  const t = useTranslations("home.cta");

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          {t("description")}
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-primary hover:bg-gray-100"
          asChild
        >
          <Link href={`/${locale}/contact`}>
            {t("button")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
