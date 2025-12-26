import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <NewsPageContent locale={locale} />;
}

function NewsPageContent({ locale }: { locale: string }) {
  const t = useTranslations("news");
  const tCommon = useTranslations("common");

  const categories = [
    "All News",
    "Company Updates",
    "Technology",
    "Industry News",
    "Events",
  ];

  const featuredNews = {
    title: "KLD Algeria Expands Operations with New Hassi Messaoud Office",
    excerpt: "Strategic expansion to better serve clients in Algeria's most important oil and gas region. The new office will house technical teams and provide local support for ongoing digital transformation projects.",
    date: "December 20, 2025",
    readTime: "5",
    category: "Company Updates",
    image: null,
  };

  const news = [
    {
      title: "Strategic Partnership Agreement with Sonatrach",
      excerpt: "KLD Algeria signs multi-year partnership agreement for digital transformation initiatives across Sonatrach's upstream operations.",
      date: "December 15, 2025",
      readTime: "4",
      category: "Company Updates",
      image: null,
    },
    {
      title: "Innovation Award 2025: Recognition for Excellence",
      excerpt: "KLD Algeria receives the prestigious Innovation Award for contributions to digital technology in the energy sector.",
      date: "December 10, 2025",
      readTime: "3",
      category: "Company Updates",
      image: null,
    },
    {
      title: "New AI-Powered Analytics Platform Launched",
      excerpt: "Introducing our next-generation analytics platform with machine learning capabilities for predictive maintenance and production optimization.",
      date: "December 5, 2025",
      readTime: "6",
      category: "Technology",
      image: null,
    },
    {
      title: "Cybersecurity Best Practices for Oil & Gas Industry",
      excerpt: "Expert insights on protecting critical infrastructure in the age of digital transformation and increasing cyber threats.",
      date: "November 28, 2025",
      readTime: "8",
      category: "Technology",
      image: null,
    },
    {
      title: "KLD Algeria at Algeria Energy Summit 2025",
      excerpt: "Join us at the Algeria Energy Summit where we'll showcase our latest digital solutions and share industry insights.",
      date: "November 20, 2025",
      readTime: "3",
      category: "Events",
      image: null,
    },
    {
      title: "Digital Transformation Trends in North Africa",
      excerpt: "Analysis of the key trends shaping digital transformation in the oil and gas industry across North Africa.",
      date: "November 15, 2025",
      readTime: "7",
      category: "Industry News",
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

      {/* Categories Filter */}
      <section className="py-6 border-b dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700">
            <div className="grid lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Featured Image</span>
              </div>
              <div className="p-8">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {featuredNews.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredNews.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredNews.readTime} {t("readTime")}
                  </div>
                </div>
                <Link
                  href={`/${locale}/news`}
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  {tCommon("readMore")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700 hover:border-primary transition-colors"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">News Image</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-3 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{item.date}</span>
                      <span>{item.readTime} {t("readTime")}</span>
                    </div>
                    <Link
                      href={`/${locale}/news`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      {tCommon("readMore")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="w-10 h-10 rounded-lg bg-primary text-white font-medium">
              1
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              2
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              3
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <ArrowRight className="h-4 w-4 mx-auto" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Stay updated with the latest news, insights, and developments from KLD Algeria.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
