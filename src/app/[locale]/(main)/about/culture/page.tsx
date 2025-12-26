import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Heart, Lightbulb, Shield, Users, Target, Zap } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("culture.title"),
    description: t("culture.description"),
  };
}

export default function CulturePage() {
  const t = useTranslations("about");

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new ideas and technologies to drive industry transformation.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical standards.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and cross-cultural cooperation.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in all our products and services.",
    },
    {
      icon: Heart,
      title: "Respect",
      description: "We value diversity and treat everyone with dignity and respect.",
    },
    {
      icon: Zap,
      title: "Agility",
      description: "We adapt quickly to changing market needs and customer requirements.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("culture.title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {t("culture.description")}
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl border dark:border-gray-700 hover:border-primary transition-colors"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
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

      {/* Work Environment */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Work Environment
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  At KLD Algeria, we foster a dynamic and inclusive work environment where
                  innovation thrives and every team member can reach their full potential.
                </p>
                <p>
                  We combine the best of Chinese and Algerian work cultures, creating a
                  unique atmosphere of collaboration, respect, and continuous learning.
                </p>
                <p>
                  Our offices are designed to encourage creativity and teamwork, with
                  modern facilities and comfortable spaces for both focused work and collaboration.
                </p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Flexible working arrangements",
                  "Professional development programs",
                  "Cross-cultural exchange opportunities",
                  "Health and wellness initiatives",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center"
                >
                  <span className="text-gray-400">Office Photo {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diversity */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Diversity & Inclusion
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            We celebrate diversity as a source of strength and innovation. Our team brings
            together talents from different backgrounds, cultures, and expertise areas,
            creating a rich environment for learning and growth.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "10+", label: "Nationalities" },
              { number: "40%", label: "Women in Leadership" },
              { number: "3", label: "Languages Spoken" },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
