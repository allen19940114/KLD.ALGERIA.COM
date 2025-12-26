import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Linkedin, Mail } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("team.title"),
    description: t("team.description"),
  };
}

export default function TeamPage() {
  const t = useTranslations("about");

  const team = [
    {
      name: "Zhang Wei",
      position: "General Manager",
      bio: "20+ years of experience in oil & gas industry digitalization.",
      image: null,
    },
    {
      name: "Ahmed Benali",
      position: "Operations Director",
      bio: "Expert in project management and local market operations.",
      image: null,
    },
    {
      name: "Li Ming",
      position: "Technical Director",
      bio: "Leading innovation in digital oilfield technologies.",
      image: null,
    },
    {
      name: "Fatima Zahra",
      position: "Business Development Manager",
      bio: "Building strategic partnerships across North Africa.",
      image: null,
    },
    {
      name: "Mohamed Cherif",
      position: "Engineering Manager",
      bio: "Specialized in SCADA and automation systems.",
      image: null,
    },
    {
      name: "Wang Xiaoming",
      position: "Software Development Lead",
      bio: "Expert in enterprise software solutions.",
      image: null,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("team.title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {t("team.description")}
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image Placeholder */}
                <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-gray-500 dark:text-gray-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            We&apos;re always looking for talented individuals to join our growing team.
            If you&apos;re passionate about technology and energy industry innovation, we&apos;d love to hear from you.
          </p>
          <a
            href="mailto:careers@kld-algeria.com"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Mail className="h-5 w-5" />
            careers@kld-algeria.com
          </a>
        </div>
      </section>
    </div>
  );
}
