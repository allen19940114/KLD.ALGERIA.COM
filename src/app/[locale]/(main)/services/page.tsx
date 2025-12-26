import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Cpu, Database, Shield, Zap, Cloud, BarChart3, Cog, Network } from "lucide-react";
import { Button } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ServicesPageContent locale={locale} />;
}

function ServicesPageContent({ locale }: { locale: string }) {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");

  const services = [
    {
      icon: Cpu,
      title: "Digital Oilfield Solutions",
      description: "Comprehensive digital transformation for oil and gas field operations, integrating IoT, automation, and real-time monitoring systems.",
      features: [
        "Real-time production monitoring",
        "Predictive maintenance systems",
        "Remote operations management",
        "Digital twin implementation",
      ],
    },
    {
      icon: Database,
      title: "Data Management & Analytics",
      description: "Advanced data analytics platforms that transform raw operational data into actionable insights for better decision-making.",
      features: [
        "Big data processing",
        "AI/ML-powered analytics",
        "Custom dashboard development",
        "Data integration services",
      ],
    },
    {
      icon: Shield,
      title: "Cybersecurity Solutions",
      description: "Comprehensive security solutions designed specifically for critical infrastructure protection in the energy sector.",
      features: [
        "OT/IT security assessment",
        "Security monitoring & response",
        "Compliance management",
        "Employee security training",
      ],
    },
    {
      icon: Zap,
      title: "Industrial Automation",
      description: "State-of-the-art automation and control systems to enhance operational efficiency and safety in industrial environments.",
      features: [
        "SCADA system implementation",
        "DCS solutions",
        "PLC programming",
        "Process optimization",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      description: "Secure and scalable cloud solutions tailored for the unique requirements of the oil and gas industry.",
      features: [
        "Private/hybrid cloud deployment",
        "Cloud migration services",
        "Disaster recovery",
        "Cloud-native development",
      ],
    },
    {
      icon: BarChart3,
      title: "Enterprise Software",
      description: "Custom enterprise software solutions including ERP, asset management, and workflow automation systems.",
      features: [
        "Custom software development",
        "ERP implementation",
        "Asset management systems",
        "Mobile applications",
      ],
    },
    {
      icon: Cog,
      title: "System Integration",
      description: "Seamless integration of diverse systems and technologies to create unified, efficient operational environments.",
      features: [
        "Legacy system integration",
        "API development",
        "Middleware solutions",
        "Cross-platform connectivity",
      ],
    },
    {
      icon: Network,
      title: "IT Consulting",
      description: "Strategic IT consulting services to help organizations navigate digital transformation and optimize technology investments.",
      features: [
        "Digital strategy development",
        "Technology roadmap planning",
        "Vendor selection support",
        "Change management",
      ],
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 border dark:border-gray-700 hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose KLD Algeria?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "20+", label: "Years of Industry Experience" },
              { number: "500+", label: "Global Projects Delivered" },
              { number: "24/7", label: "Technical Support" },
              { number: "100%", label: "Customer Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Contact us today to discuss how our services can help transform your operations
            and drive your digital journey forward.
          </p>
          <Button size="lg" asChild>
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
