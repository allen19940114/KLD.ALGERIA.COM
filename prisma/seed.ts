import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@kld-algeria.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Admin",
        role: "admin",
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log("Admin user already exists");
  }

  // Create sample news categories
  const newsCategories = [
    { name: { en: "Company Updates", zh: "公司动态", fr: "Actualités", ar: "أخبار الشركة" }, slug: "company-updates" },
    { name: { en: "Technology", zh: "技术", fr: "Technologie", ar: "التكنولوجيا" }, slug: "technology" },
    { name: { en: "Industry News", zh: "行业新闻", fr: "Nouvelles de l'industrie", ar: "أخبار الصناعة" }, slug: "industry-news" },
    { name: { en: "Events", zh: "活动", fr: "Événements", ar: "الفعاليات" }, slug: "events" },
  ];

  for (const category of newsCategories) {
    await prisma.newsCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log("Created news categories");

  // Create sample product categories
  const productCategories = [
    { name: { en: "Production Management", zh: "生产管理", fr: "Gestion de production", ar: "إدارة الإنتاج" }, slug: "production-management" },
    { name: { en: "Data Analytics", zh: "数据分析", fr: "Analytique de données", ar: "تحليل البيانات" }, slug: "data-analytics" },
    { name: { en: "Safety & Compliance", zh: "安全合规", fr: "Sécurité et conformité", ar: "السلامة والامتثال" }, slug: "safety-compliance" },
    { name: { en: "Asset Management", zh: "资产管理", fr: "Gestion des actifs", ar: "إدارة الأصول" }, slug: "asset-management" },
  ];

  for (const category of productCategories) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log("Created product categories");

  // Create company info
  const companyInfoItems = [
    {
      key: "about",
      value: {
        en: "Kunlun Digital Technology (KLD) Algeria is a subsidiary of China National Petroleum Corporation, dedicated to providing world-class digital solutions for the energy sector.",
        zh: "昆仑数智阿尔及利亚是中国石油天然气集团公司的子公司，致力于为能源行业提供世界一流的数字化解决方案。",
        fr: "Kunlun Digital Technology (KLD) Algérie est une filiale de China National Petroleum Corporation, dédiée à fournir des solutions numériques de classe mondiale pour le secteur de l'énergie.",
        ar: "كونلون للتكنولوجيا الرقمية الجزائر هي شركة تابعة لمؤسسة البترول الوطنية الصينية، مكرسة لتقديم حلول رقمية عالمية المستوى لقطاع الطاقة.",
      },
    },
    {
      key: "mission",
      value: {
        en: "To empower Algeria's energy sector with cutting-edge digital technology solutions.",
        zh: "为阿尔及利亚能源行业提供尖端数字技术解决方案。",
        fr: "Donner au secteur énergétique algérien les moyens de solutions technologiques numériques de pointe.",
        ar: "تمكين قطاع الطاقة في الجزائر بحلول التكنولوجيا الرقمية المتطورة.",
      },
    },
    {
      key: "vision",
      value: {
        en: "To be the leading digital technology partner for the oil and gas industry in North Africa.",
        zh: "成为北非油气行业领先的数字技术合作伙伴。",
        fr: "Être le partenaire technologique numérique de premier plan pour l'industrie pétrolière et gazière en Afrique du Nord.",
        ar: "أن نكون الشريك الرائد في التكنولوجيا الرقمية لصناعة النفط والغاز في شمال أفريقيا.",
      },
    },
  ];

  for (const info of companyInfoItems) {
    await prisma.companyInfo.upsert({
      where: { key: info.key },
      update: { value: info.value },
      create: info,
    });
  }
  console.log("Created company info");

  // Create timeline
  const timelineItems = [
    { year: "2024", title: { en: "Expansion & Growth", zh: "扩张与增长", fr: "Expansion et croissance", ar: "التوسع والنمو" }, order: 1 },
    { year: "2023", title: { en: "Strategic Partnerships", zh: "战略合作", fr: "Partenariats stratégiques", ar: "الشراكات الاستراتيجية" }, order: 2 },
    { year: "2022", title: { en: "Technology Innovation", zh: "技术创新", fr: "Innovation technologique", ar: "الابتكار التكنولوجي" }, order: 3 },
    { year: "2021", title: { en: "Market Entry", zh: "市场进入", fr: "Entrée sur le marché", ar: "دخول السوق" }, order: 4 },
  ];

  for (const item of timelineItems) {
    const existing = await prisma.timeline.findFirst({ where: { year: item.year } });
    if (!existing) {
      await prisma.timeline.create({ data: item });
    }
  }
  console.log("Created timeline");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
