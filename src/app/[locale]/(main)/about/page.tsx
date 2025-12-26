import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Building2, Target, Users, Award } from "lucide-react";
import { Button } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("company.description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AboutPageContent locale={locale} />;
}

function AboutPageContent({ locale }: { locale: string }) {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");

  const sections = [
    {
      icon: Building2,
      title: t("company.title"),
      description: t("company.description"),
      href: `/${locale}/about`,
    },
    {
      icon: Target,
      title: t("history.title"),
      description: t("history.description"),
      href: `/${locale}/about/history`,
    },
    {
      icon: Users,
      title: t("team.title"),
      description: t("team.description"),
      href: `/${locale}/about/team`,
    },
    {
      icon: Award,
      title: t("certifications.title"),
      description: t("certifications.description"),
      href: `/${locale}/about`,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {t("company.description")}
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t("company.title")}
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  Kunlun Digital Technology (KLD) Algeria is a subsidiary of China National Petroleum Corporation (CNPC),
                  one of the world&apos;s largest oil and gas companies. We are dedicated to providing world-class digital
                  technology solutions for the energy sector in Algeria.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  With our deep expertise in oil and gas industry digitalization, we help enterprises achieve
                  operational excellence through innovative technology solutions, data analytics, and automation systems.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Our mission is to accelerate the digital transformation of Algeria&apos;s energy sector,
                  contributing to the country&apos;s economic development and technological advancement.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-lg">Company Building Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                To empower Algeria&apos;s energy sector with cutting-edge digital technology solutions,
                driving operational efficiency, safety, and sustainable development.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                To be the leading digital technology partner for the oil and gas industry in North Africa,
                recognized for innovation, excellence, and commitment to customer success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => (
              <Link
                key={index}
                href={section.href}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {section.description}
                </p>
                <span className="text-primary font-medium inline-flex items-center">
                  {tCommon("learnMore")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Continuously pushing boundaries to deliver cutting-edge solutions.",
              },
              {
                title: "Integrity",
                description: "Building trust through honest and transparent business practices.",
              },
              {
                title: "Excellence",
                description: "Striving for the highest standards in everything we do.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
