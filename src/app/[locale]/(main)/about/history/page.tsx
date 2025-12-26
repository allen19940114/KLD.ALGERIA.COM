import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("history.title"),
    description: t("history.description"),
  };
}

export default function HistoryPage() {
  const t = useTranslations("about");

  const timeline = [
    {
      year: "2024",
      title: "Expansion & Growth",
      description: "Expanded operations with new office in Hassi Messaoud, strengthening presence in oil-rich regions.",
    },
    {
      year: "2023",
      title: "Strategic Partnerships",
      description: "Signed strategic partnership agreements with major Algerian energy companies.",
    },
    {
      year: "2022",
      title: "Technology Innovation",
      description: "Launched advanced digital oilfield solutions tailored for Algerian operations.",
    },
    {
      year: "2021",
      title: "Market Entry",
      description: "Established KLD Algeria as a subsidiary, bringing CNPC's digital expertise to the region.",
    },
    {
      year: "2020",
      title: "Foundation",
      description: "Initial market research and planning for Algeria operations under CNPC's global expansion strategy.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("history.title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {t("history.description")}
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

              {/* Timeline Items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex gap-8">
                    {/* Year Circle */}
                    <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10">
                      <span className="text-white font-bold">{item.year}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Key Milestones
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "100+", label: "Team Members" },
              { number: "10+", label: "Industry Partners" },
              { number: "4", label: "Years of Excellence" },
            ].map((stat, index) => (
              <div key={index}>
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
