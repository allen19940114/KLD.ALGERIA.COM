import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ProductsPageContent locale={locale} />;
}

function ProductsPageContent({ locale }: { locale: string }) {
  const t = useTranslations("products");
  const tCommon = useTranslations("common");

  const categories = [
    {
      name: "Production Management",
      description: "Software solutions for oil and gas production optimization and monitoring.",
    },
    {
      name: "Data Analytics",
      description: "Advanced analytics platforms for operational intelligence.",
    },
    {
      name: "Safety & Compliance",
      description: "Tools for HSE management and regulatory compliance.",
    },
    {
      name: "Asset Management",
      description: "Enterprise asset management and maintenance solutions.",
    },
  ];

  const products = [
    {
      name: "KLD Production Suite",
      category: "Production Management",
      description: "Comprehensive production management platform for real-time monitoring, analysis, and optimization of oil and gas operations.",
      features: ["Real-time dashboards", "Production forecasting", "Well performance analysis", "Allocation management"],
      image: null,
    },
    {
      name: "KLD Analytics Platform",
      category: "Data Analytics",
      description: "AI-powered analytics platform that transforms operational data into actionable insights for better decision-making.",
      features: ["Predictive analytics", "Machine learning models", "Custom reporting", "Data visualization"],
      image: null,
    },
    {
      name: "KLD SCADA System",
      category: "Production Management",
      description: "Industrial-grade SCADA solution designed specifically for oil and gas field automation and remote monitoring.",
      features: ["Remote monitoring", "Alarm management", "Historical data", "Integration APIs"],
      image: null,
    },
    {
      name: "KLD Safety Manager",
      category: "Safety & Compliance",
      description: "Integrated HSE management system for safety compliance, incident tracking, and risk management.",
      features: ["Incident reporting", "Risk assessment", "Compliance tracking", "Training management"],
      image: null,
    },
    {
      name: "KLD Asset Tracker",
      category: "Asset Management",
      description: "Enterprise asset management solution for equipment lifecycle management and maintenance optimization.",
      features: ["Asset registry", "Maintenance scheduling", "Spare parts management", "Cost tracking"],
      image: null,
    },
    {
      name: "KLD Field Mobile",
      category: "Production Management",
      description: "Mobile application for field operations, enabling real-time data capture and communication from anywhere.",
      features: ["Offline capability", "GPS integration", "Photo/video capture", "Digital forms"],
      image: null,
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
            {t("description")}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors border dark:border-gray-700"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700 hover:border-primary transition-colors"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">Product Image</span>
                </div>

                <div className="p-6">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-3 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/products`}
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    {t("viewDetails")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Our team can develop tailored solutions to meet your specific operational requirements.
            Contact us to discuss your needs.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100"
            asChild
          >
            <Link href={`/${locale}/contact`}>
              {tCommon("contactUs")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
