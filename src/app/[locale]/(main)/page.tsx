import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Database, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui";

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
  return (
    <>
      <HeroSection />
      <ServicesSection locale={locale} />
      <AboutSection locale={locale} />
      <ProjectsSection locale={locale} />
      <NewsSection locale={locale} />
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
      title: "Digital Solutions",
      description:
        "Cutting-edge digital transformation solutions for the energy sector.",
    },
    {
      icon: Database,
      title: "Data Management",
      description:
        "Advanced data analytics and management systems for oil & gas operations.",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect critical infrastructure.",
    },
    {
      icon: Zap,
      title: "Automation",
      description:
        "Industrial automation and control systems for enhanced efficiency.",
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
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {service.description}
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

function AboutSection({ locale }: { locale: string }) {
  const t = useTranslations("home.about");
  const tCommon = useTranslations("common");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {t("description")}
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "World-class digital technology expertise",
                "Deep understanding of oil & gas industry",
                "Proven track record in Algeria",
                "Commitment to innovation and excellence",
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

function ProjectsSection({ locale }: { locale: string }) {
  const t = useTranslations("home.projects");
  const tCommon = useTranslations("common");

  const projects = [
    {
      title: "Digital Oilfield Implementation",
      description: "Complete digital transformation for major oil field operations.",
      image: "/placeholder-project-1.jpg",
    },
    {
      title: "SCADA System Upgrade",
      description: "Modern SCADA system deployment for pipeline monitoring.",
      image: "/placeholder-project-2.jpg",
    },
    {
      title: "Data Analytics Platform",
      description: "Real-time data analytics platform for production optimization.",
      image: "/placeholder-project-3.jpg",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <Link
                  href={`/${locale}/projects`}
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

function NewsSection({ locale }: { locale: string }) {
  const t = useTranslations("home.news");
  const tCommon = useTranslations("common");

  const news = [
    {
      title: "KLD Algeria Expands Operations",
      date: "December 20, 2025",
      excerpt: "New office opening in Hassi Messaoud to better serve our clients.",
    },
    {
      title: "Partnership with Sonatrach",
      date: "December 15, 2025",
      excerpt: "Strategic partnership agreement signed for digital transformation projects.",
    },
    {
      title: "Innovation Award 2025",
      date: "December 10, 2025",
      excerpt: "KLD Algeria receives recognition for technological innovation.",
    },
  ];

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
          {news.map((item, index) => (
            <article
              key={index}
              className="border dark:border-gray-800 rounded-xl p-6 hover:border-primary transition-colors"
            >
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {item.date}
              </time>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-2 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {item.excerpt}
              </p>
              <Link
                href={`/${locale}/news`}
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
