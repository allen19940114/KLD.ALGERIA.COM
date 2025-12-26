import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ProjectsPageContent locale={locale} />;
}

function ProjectsPageContent({ locale }: { locale: string }) {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");

  const projects = [
    {
      title: "Digital Oilfield Transformation - Hassi Messaoud",
      client: "Sonatrach",
      location: "Hassi Messaoud, Algeria",
      year: "2024",
      description: "Complete digital transformation of oil field operations, implementing IoT sensors, real-time monitoring, and predictive analytics.",
      results: [
        "30% reduction in unplanned downtime",
        "15% increase in production efficiency",
        "Real-time visibility across 200+ wells",
      ],
      image: null,
    },
    {
      title: "SCADA System Modernization",
      client: "TRC (Transporting by Pipeline)",
      location: "In Amenas, Algeria",
      year: "2023",
      description: "Upgrade of legacy SCADA systems to modern, cybersecure infrastructure for pipeline monitoring and control.",
      results: [
        "Enhanced cybersecurity posture",
        "99.9% system availability",
        "Centralized operations center",
      ],
      image: null,
    },
    {
      title: "Production Analytics Platform",
      client: "Groupement Berkine",
      location: "Ouargla, Algeria",
      year: "2023",
      description: "Development and deployment of an AI-powered analytics platform for production optimization and forecasting.",
      results: [
        "Improved production forecasting accuracy by 25%",
        "Automated reporting saving 100+ hours/month",
        "Integration with existing systems",
      ],
      image: null,
    },
    {
      title: "Asset Management System Implementation",
      client: "Anadarko Algeria",
      location: "Algiers, Algeria",
      year: "2022",
      description: "Enterprise asset management system implementation for complete lifecycle management of field equipment.",
      results: [
        "Reduced maintenance costs by 20%",
        "Improved spare parts inventory management",
        "Complete asset traceability",
      ],
      image: null,
    },
    {
      title: "HSE Digital Platform",
      client: "Sonatrach",
      location: "Multiple Locations",
      year: "2022",
      description: "Development of a comprehensive HSE management platform for incident reporting, risk assessment, and compliance tracking.",
      results: [
        "Streamlined incident reporting process",
        "Real-time safety KPI dashboards",
        "Regulatory compliance automation",
      ],
      image: null,
    },
    {
      title: "Field Mobility Solution",
      client: "AGIP/Eni",
      location: "Illizi Province",
      year: "2021",
      description: "Mobile application deployment for field technicians enabling digital data capture, work orders, and communication.",
      results: [
        "Eliminated paper-based processes",
        "Real-time data synchronization",
        "Improved field-to-office communication",
      ],
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

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700"
              >
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="h-64 lg:h-auto bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">Project Image</span>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {project.client}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.year}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {project.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        {t("results")}:
                      </h4>
                      <ul className="space-y-2">
                        {project.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Track Record
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "10+", label: "Major Clients" },
              { number: "500+", label: "Wells Digitized" },
              { number: "1000km+", label: "Pipelines Monitored" },
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
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
            Start Your Digital Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Ready to transform your operations? Contact us to discuss how we can help
            you achieve similar results.
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
