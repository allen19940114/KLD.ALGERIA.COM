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

  // Create news categories
  const newsCategories = [
    { name: { en: "Company Updates", zh: "公司动态", fr: "Actualités", ar: "أخبار الشركة" }, slug: "company-updates", order: 1 },
    { name: { en: "Technology", zh: "技术", fr: "Technologie", ar: "التكنولوجيا" }, slug: "technology", order: 2 },
    { name: { en: "Industry News", zh: "行业新闻", fr: "Nouvelles de l'industrie", ar: "أخبار الصناعة" }, slug: "industry-news", order: 3 },
    { name: { en: "Events", zh: "活动", fr: "Événements", ar: "الفعاليات" }, slug: "events", order: 4 },
  ];

  for (const category of newsCategories) {
    await prisma.newsCategory.upsert({
      where: { slug: category.slug },
      update: { name: category.name, order: category.order },
      create: category,
    });
  }
  console.log("Created news categories");

  // Get category IDs for news
  const companyUpdatesCategory = await prisma.newsCategory.findUnique({ where: { slug: "company-updates" } });
  const technologyCategory = await prisma.newsCategory.findUnique({ where: { slug: "technology" } });
  const industryCategory = await prisma.newsCategory.findUnique({ where: { slug: "industry-news" } });

  // Create sample news
  const newsItems = [
    {
      title: { en: "KLD Algeria Launches New Digital Oilfield Platform", zh: "昆仑数智阿尔及利亚发布新数字油田平台", fr: "KLD Algérie lance une nouvelle plateforme pétrolière numérique", ar: "كونلون الجزائر تطلق منصة حقل نفطي رقمية جديدة" },
      slug: "kld-launches-digital-oilfield-platform",
      excerpt: { en: "Revolutionary platform brings AI-powered analytics to oil and gas operations.", zh: "革命性平台将人工智能分析引入油气运营。", fr: "Une plateforme révolutionnaire apporte des analyses basées sur l'IA aux opérations pétrolières et gazières.", ar: "منصة ثورية تجلب تحليلات مدعومة بالذكاء الاصطناعي لعمليات النفط والغاز." },
      content: { en: "KLD Algeria is proud to announce the launch of our revolutionary Digital Oilfield Platform. This cutting-edge solution leverages artificial intelligence and machine learning to optimize production, reduce costs, and improve safety across oil and gas operations.\n\nThe platform integrates real-time data from sensors, SCADA systems, and IoT devices to provide comprehensive insights into field operations. Key features include predictive maintenance, production optimization, and automated reporting.\n\nOur team has worked closely with industry partners to ensure the platform meets the specific needs of the Algerian energy sector.", zh: "昆仑数智阿尔及利亚自豪地宣布推出革命性的数字油田平台。这一尖端解决方案利用人工智能和机器学习来优化生产、降低成本并提高油气运营的安全性。\n\n该平台整合来自传感器、SCADA系统和物联网设备的实时数据，提供对现场运营的全面洞察。主要功能包括预测性维护、生产优化和自动化报告。\n\n我们的团队与行业合作伙伴密切合作，确保平台满足阿尔及利亚能源行业的特定需求。", fr: "KLD Algérie est fière d'annoncer le lancement de notre plateforme révolutionnaire de champ pétrolier numérique. Cette solution de pointe exploite l'intelligence artificielle et l'apprentissage automatique pour optimiser la production, réduire les coûts et améliorer la sécurité des opérations pétrolières et gazières.", ar: "تفخر كونلون الجزائر بالإعلان عن إطلاق منصتنا الثورية للحقول النفطية الرقمية. يستفيد هذا الحل المتطور من الذكاء الاصطناعي والتعلم الآلي لتحسين الإنتاج وتقليل التكاليف وتحسين السلامة في عمليات النفط والغاز." },
      image: "/uploads/news-digital-platform.jpg",
      categoryId: technologyCategory?.id,
      isPublished: true,
      publishedAt: new Date("2024-12-20"),
    },
    {
      title: { en: "Partnership with Sonatrach Strengthens Digital Transformation", zh: "与索纳特拉克的合作加强数字化转型", fr: "Le partenariat avec Sonatrach renforce la transformation numérique", ar: "الشراكة مع سوناطراك تعزز التحول الرقمي" },
      slug: "partnership-sonatrach-digital-transformation",
      excerpt: { en: "Strategic partnership accelerates Algeria's energy sector digitalization.", zh: "战略合作加速阿尔及利亚能源行业数字化。", fr: "Le partenariat stratégique accélère la numérisation du secteur énergétique algérien.", ar: "الشراكة الاستراتيجية تسرع رقمنة قطاع الطاقة الجزائري." },
      content: { en: "KLD Algeria and Sonatrach have signed a strategic partnership agreement to accelerate digital transformation across Algeria's energy infrastructure. This collaboration will bring world-class technology solutions to enhance operational efficiency and sustainability.", zh: "昆仑数智阿尔及利亚与索纳特拉克签署战略合作协议，加速阿尔及利亚能源基础设施的数字化转型。此次合作将带来世界一流的技术解决方案，提升运营效率和可持续性。", fr: "KLD Algérie et Sonatrach ont signé un accord de partenariat stratégique pour accélérer la transformation numérique de l'infrastructure énergétique de l'Algérie.", ar: "وقعت كونلون الجزائر وسوناطراك اتفاقية شراكة استراتيجية لتسريع التحول الرقمي في البنية التحتية للطاقة في الجزائر." },
      image: "/uploads/news-partnership.jpg",
      categoryId: companyUpdatesCategory?.id,
      isPublished: true,
      publishedAt: new Date("2024-12-15"),
    },
    {
      title: { en: "AI-Powered Predictive Maintenance Reduces Downtime by 40%", zh: "人工智能预测性维护减少40%停机时间", fr: "La maintenance prédictive alimentée par l'IA réduit les temps d'arrêt de 40%", ar: "الصيانة التنبؤية المدعومة بالذكاء الاصطناعي تقلل وقت التوقف بنسبة 40%" },
      slug: "ai-predictive-maintenance-success",
      excerpt: { en: "Case study shows significant improvements in equipment reliability.", zh: "案例研究显示设备可靠性显著提高。", fr: "Une étude de cas montre des améliorations significatives de la fiabilité des équipements.", ar: "دراسة حالة تظهر تحسينات كبيرة في موثوقية المعدات." },
      content: { en: "Our AI-powered predictive maintenance solution has achieved remarkable results at a major oil field in southern Algeria. The implementation has led to a 40% reduction in unplanned downtime and significant cost savings.", zh: "我们的人工智能预测性维护解决方案在阿尔及利亚南部一个主要油田取得了显著成效。实施后非计划停机时间减少了40%，成本也大幅节省。", fr: "Notre solution de maintenance prédictive alimentée par l'IA a obtenu des résultats remarquables dans un important champ pétrolier du sud de l'Algérie.", ar: "حققت حلولنا للصيانة التنبؤية المدعومة بالذكاء الاصطناعي نتائج ملحوظة في حقل نفطي رئيسي في جنوب الجزائر." },
      image: "/uploads/news-ai-maintenance.jpg",
      categoryId: technologyCategory?.id,
      isPublished: true,
      publishedAt: new Date("2024-12-10"),
    },
    {
      title: { en: "KLD Algeria Hosts Energy Digitalization Summit 2024", zh: "昆仑数智阿尔及利亚举办2024能源数字化峰会", fr: "KLD Algérie accueille le Sommet de la numérisation énergétique 2024", ar: "كونلون الجزائر تستضيف قمة رقمنة الطاقة 2024" },
      slug: "energy-digitalization-summit-2024",
      excerpt: { en: "Industry leaders gather to discuss the future of digital energy.", zh: "行业领袖齐聚探讨数字能源的未来。", fr: "Les leaders de l'industrie se réunissent pour discuter de l'avenir de l'énergie numérique.", ar: "قادة الصناعة يجتمعون لمناقشة مستقبل الطاقة الرقمية." },
      content: { en: "KLD Algeria successfully hosted the Energy Digitalization Summit 2024 in Algiers. The event brought together over 200 industry professionals to discuss the latest trends in digital transformation for the energy sector.", zh: "昆仑数智阿尔及利亚在阿尔及尔成功举办2024能源数字化峰会。此次活动汇聚了200多位行业专业人士，共同探讨能源行业数字化转型的最新趋势。", fr: "KLD Algérie a organisé avec succès le Sommet de la numérisation énergétique 2024 à Alger.", ar: "استضافت كونلون الجزائر بنجاح قمة رقمنة الطاقة 2024 في الجزائر العاصمة." },
      image: "/uploads/news-summit.jpg",
      categoryId: industryCategory?.id,
      isPublished: true,
      publishedAt: new Date("2024-12-05"),
    },
  ];

  for (const news of newsItems) {
    const existing = await prisma.news.findUnique({ where: { slug: news.slug } });
    if (!existing) {
      await prisma.news.create({ data: news });
    }
  }
  console.log("Created sample news");

  // Create product categories
  const productCategories = [
    { name: { en: "Production Management", zh: "生产管理", fr: "Gestion de production", ar: "إدارة الإنتاج" }, slug: "production-management", order: 1 },
    { name: { en: "Data Analytics", zh: "数据分析", fr: "Analytique de données", ar: "تحليل البيانات" }, slug: "data-analytics", order: 2 },
    { name: { en: "Safety & Compliance", zh: "安全合规", fr: "Sécurité et conformité", ar: "السلامة والامتثال" }, slug: "safety-compliance", order: 3 },
    { name: { en: "Asset Management", zh: "资产管理", fr: "Gestion des actifs", ar: "إدارة الأصول" }, slug: "asset-management", order: 4 },
  ];

  for (const category of productCategories) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: { name: category.name, order: category.order },
      create: category,
    });
  }
  console.log("Created product categories");

  // Get product category IDs
  const productionMgmtCategory = await prisma.productCategory.findUnique({ where: { slug: "production-management" } });
  const dataAnalyticsCategory = await prisma.productCategory.findUnique({ where: { slug: "data-analytics" } });
  const safetyCategory = await prisma.productCategory.findUnique({ where: { slug: "safety-compliance" } });
  const assetCategory = await prisma.productCategory.findUnique({ where: { slug: "asset-management" } });

  // Create sample products
  const products = [
    {
      name: { en: "SCADA System", zh: "SCADA系统", fr: "Système SCADA", ar: "نظام سكادا" },
      slug: "scada-system",
      description: { en: "Advanced supervisory control and data acquisition system for real-time monitoring.", zh: "先进的监控和数据采集系统，实现实时监控。", fr: "Système avancé de contrôle et d'acquisition de données pour la surveillance en temps réel.", ar: "نظام متقدم للتحكم الإشرافي واكتساب البيانات للمراقبة في الوقت الفعلي." },
      content: { en: "Our SCADA system provides comprehensive monitoring and control capabilities for oil and gas operations. Features include real-time data visualization, alarm management, and remote control functionality.", zh: "我们的SCADA系统为油气运营提供全面的监控能力。功能包括实时数据可视化、报警管理和远程控制功能。", fr: "Notre système SCADA offre des capacités complètes de surveillance et de contrôle pour les opérations pétrolières et gazières.", ar: "يوفر نظام سكادا لدينا إمكانيات شاملة للمراقبة والتحكم في عمليات النفط والغاز." },
      image: "/uploads/product-scada.jpg",
      categoryId: productionMgmtCategory?.id,
      isActive: true,
      order: 1,
    },
    {
      name: { en: "Production Optimization Platform", zh: "生产优化平台", fr: "Plateforme d'optimisation de la production", ar: "منصة تحسين الإنتاج" },
      slug: "production-optimization",
      description: { en: "AI-driven platform for maximizing production efficiency.", zh: "人工智能驱动的平台，最大化生产效率。", fr: "Plateforme pilotée par l'IA pour maximiser l'efficacité de la production.", ar: "منصة مدفوعة بالذكاء الاصطناعي لتحقيق أقصى كفاءة إنتاجية." },
      content: { en: "Leverage artificial intelligence to optimize production operations. Our platform analyzes real-time data to identify optimization opportunities and automate adjustments.", zh: "利用人工智能优化生产运营。我们的平台分析实时数据，识别优化机会并自动调整。", fr: "Exploitez l'intelligence artificielle pour optimiser les opérations de production.", ar: "استفد من الذكاء الاصطناعي لتحسين عمليات الإنتاج." },
      image: "/uploads/product-optimization.jpg",
      categoryId: productionMgmtCategory?.id,
      isActive: true,
      order: 2,
    },
    {
      name: { en: "Data Analytics Suite", zh: "数据分析套件", fr: "Suite d'analyse de données", ar: "مجموعة تحليل البيانات" },
      slug: "data-analytics-suite",
      description: { en: "Comprehensive analytics solution for energy sector insights.", zh: "能源行业洞察的综合分析解决方案。", fr: "Solution d'analyse complète pour les insights du secteur énergétique.", ar: "حل تحليلي شامل لرؤى قطاع الطاقة." },
      content: { en: "Transform raw data into actionable insights with our comprehensive analytics suite. Features advanced visualization, predictive analytics, and customizable dashboards.", zh: "通过我们的综合分析套件将原始数据转化为可操作的洞察。具有高级可视化、预测分析和可定制仪表板功能。", fr: "Transformez les données brutes en informations exploitables avec notre suite d'analyse complète.", ar: "حول البيانات الخام إلى رؤى قابلة للتنفيذ مع مجموعة التحليلات الشاملة لدينا." },
      image: "/uploads/product-analytics.jpg",
      categoryId: dataAnalyticsCategory?.id,
      isActive: true,
      order: 1,
    },
    {
      name: { en: "HSE Management System", zh: "HSE管理系统", fr: "Système de gestion HSE", ar: "نظام إدارة الصحة والسلامة والبيئة" },
      slug: "hse-management",
      description: { en: "Comprehensive health, safety, and environmental management platform.", zh: "全面的健康、安全和环境管理平台。", fr: "Plateforme complète de gestion de la santé, de la sécurité et de l'environnement.", ar: "منصة شاملة لإدارة الصحة والسلامة والبيئة." },
      content: { en: "Ensure compliance and safety with our integrated HSE management system. Track incidents, manage permits, conduct audits, and maintain comprehensive documentation.", zh: "通过我们的集成HSE管理系统确保合规和安全。追踪事故、管理许可证、进行审计并保持全面的文档记录。", fr: "Assurez la conformité et la sécurité avec notre système de gestion HSE intégré.", ar: "تأكد من الامتثال والسلامة مع نظام إدارة الصحة والسلامة والبيئة المتكامل لدينا." },
      image: "/uploads/product-hse.jpg",
      categoryId: safetyCategory?.id,
      isActive: true,
      order: 1,
    },
    {
      name: { en: "Asset Performance Management", zh: "资产绩效管理", fr: "Gestion de la performance des actifs", ar: "إدارة أداء الأصول" },
      slug: "asset-performance",
      description: { en: "Maximize asset reliability and reduce maintenance costs.", zh: "最大化资产可靠性并降低维护成本。", fr: "Maximisez la fiabilité des actifs et réduisez les coûts de maintenance.", ar: "تعظيم موثوقية الأصول وتقليل تكاليف الصيانة." },
      content: { en: "Our APM solution combines predictive maintenance, condition monitoring, and reliability engineering to optimize asset performance and extend equipment life.", zh: "我们的APM解决方案结合预测性维护、状态监测和可靠性工程，优化资产性能并延长设备寿命。", fr: "Notre solution APM combine maintenance prédictive, surveillance conditionnelle et ingénierie de fiabilité.", ar: "يجمع حل إدارة أداء الأصول لدينا بين الصيانة التنبؤية ومراقبة الحالة وهندسة الموثوقية." },
      image: "/uploads/product-apm.jpg",
      categoryId: assetCategory?.id,
      isActive: true,
      order: 1,
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }
  console.log("Created sample products");

  // Create sample projects
  const projects = [
    {
      title: { en: "Digital Oilfield Transformation - Hassi Messaoud", zh: "数字油田转型 - 哈西迈萨乌德", fr: "Transformation du champ pétrolier numérique - Hassi Messaoud", ar: "التحول الرقمي للحقول النفطية - حاسي مسعود" },
      slug: "hassi-messaoud-digital-transformation",
      description: { en: "Comprehensive digital transformation of one of Algeria's largest oil fields.", zh: "阿尔及利亚最大油田之一的全面数字化转型。", fr: "Transformation numérique complète de l'un des plus grands champs pétroliers d'Algérie.", ar: "التحول الرقمي الشامل لأحد أكبر حقول النفط في الجزائر." },
      content: { en: "This flagship project involved the complete digitalization of operations at Hassi Messaoud. We implemented SCADA systems, IoT sensors, and AI-powered analytics across 150+ wells.", zh: "这个旗舰项目涉及哈西迈萨乌德运营的完全数字化。我们在150多口井上实施了SCADA系统、物联网传感器和人工智能分析。", fr: "Ce projet phare a impliqué la numérisation complète des opérations à Hassi Messaoud.", ar: "تضمن هذا المشروع الرائد الرقمنة الكاملة للعمليات في حاسي مسعود." },
      client: { en: "Sonatrach", zh: "索纳特拉克", fr: "Sonatrach", ar: "سوناطراك" },
      location: { en: "Hassi Messaoud, Algeria", zh: "阿尔及利亚哈西迈萨乌德", fr: "Hassi Messaoud, Algérie", ar: "حاسي مسعود، الجزائر" },
      year: "2024",
      image: "/uploads/project-hassi.jpg",
      isActive: true,
      order: 1,
    },
    {
      title: { en: "SCADA Modernization - In Amenas Gas Plant", zh: "SCADA现代化 - 因阿梅纳斯天然气厂", fr: "Modernisation SCADA - Usine de gaz In Amenas", ar: "تحديث سكادا - مصنع غاز عين أميناس" },
      slug: "in-amenas-scada-modernization",
      description: { en: "Complete SCADA system upgrade for enhanced operational control.", zh: "完整的SCADA系统升级，增强运营控制。", fr: "Mise à niveau complète du système SCADA pour un contrôle opérationnel amélioré.", ar: "ترقية كاملة لنظام سكادا لتعزيز التحكم التشغيلي." },
      content: { en: "Modernized the legacy SCADA infrastructure at In Amenas gas processing facility. The new system provides improved reliability, security, and remote monitoring capabilities.", zh: "对因阿梅纳斯天然气处理设施的传统SCADA基础设施进行了现代化改造。新系统提供更高的可靠性、安全性和远程监控能力。", fr: "Modernisation de l'infrastructure SCADA héritée de l'usine de traitement de gaz d'In Amenas.", ar: "تحديث البنية التحتية القديمة لنظام سكادا في منشأة معالجة الغاز في عين أميناس." },
      client: { en: "BP / Sonatrach JV", zh: "BP / 索纳特拉克合资企业", fr: "BP / Sonatrach JV", ar: "بي بي / سوناطراك مشروع مشترك" },
      location: { en: "In Amenas, Algeria", zh: "阿尔及利亚因阿梅纳斯", fr: "In Amenas, Algérie", ar: "عين أميناس، الجزائر" },
      year: "2023",
      image: "/uploads/project-amenas.jpg",
      isActive: true,
      order: 2,
    },
    {
      title: { en: "Production Analytics Platform - Ourhoud Field", zh: "生产分析平台 - 乌尔胡德油田", fr: "Plateforme d'analyse de production - Champ Ourhoud", ar: "منصة تحليلات الإنتاج - حقل أورهود" },
      slug: "ourhoud-analytics-platform",
      description: { en: "Advanced analytics implementation for production optimization.", zh: "用于生产优化的高级分析实施。", fr: "Mise en œuvre d'analyses avancées pour l'optimisation de la production.", ar: "تنفيذ تحليلات متقدمة لتحسين الإنتاج." },
      content: { en: "Deployed our Data Analytics Suite to provide real-time production insights and optimization recommendations. The platform has improved production efficiency by 15%.", zh: "部署了我们的数据分析套件，提供实时生产洞察和优化建议。该平台将生产效率提高了15%。", fr: "Déploiement de notre suite d'analyse de données pour fournir des informations de production en temps réel.", ar: "نشر مجموعة تحليل البيانات لدينا لتوفير رؤى إنتاج في الوقت الفعلي." },
      client: { en: "Anadarko / Sonatrach", zh: "阿纳达科 / 索纳特拉克", fr: "Anadarko / Sonatrach", ar: "أناداركو / سوناطراك" },
      location: { en: "Ourhoud, Algeria", zh: "阿尔及利亚乌尔胡德", fr: "Ourhoud, Algérie", ar: "أورهود، الجزائر" },
      year: "2023",
      image: "/uploads/project-ourhoud.jpg",
      isActive: true,
      order: 3,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findUnique({ where: { slug: project.slug } });
    if (!existing) {
      await prisma.project.create({ data: project });
    }
  }
  console.log("Created sample projects");

  // Create company info
  const companyInfoItems = [
    {
      key: "about",
      value: {
        en: "Kunlun Digital Technology (KLD) Algeria is a subsidiary of China National Petroleum Corporation, dedicated to providing world-class digital solutions for the energy sector. With a team of experienced professionals and cutting-edge technology, we help oil and gas companies optimize operations, reduce costs, and improve safety.",
        zh: "昆仑数智阿尔及利亚是中国石油天然气集团公司的子公司，致力于为能源行业提供世界一流的数字化解决方案。凭借经验丰富的专业团队和尖端技术，我们帮助油气公司优化运营、降低成本并提高安全性。",
        fr: "Kunlun Digital Technology (KLD) Algérie est une filiale de China National Petroleum Corporation, dédiée à fournir des solutions numériques de classe mondiale pour le secteur de l'énergie.",
        ar: "كونلون للتكنولوجيا الرقمية الجزائر هي شركة تابعة لمؤسسة البترول الوطنية الصينية، مكرسة لتقديم حلول رقمية عالمية المستوى لقطاع الطاقة.",
      },
    },
    {
      key: "mission",
      value: {
        en: "To empower Algeria's energy sector with cutting-edge digital technology solutions that drive efficiency, safety, and sustainability.",
        zh: "为阿尔及利亚能源行业提供尖端数字技术解决方案，推动效率、安全和可持续发展。",
        fr: "Donner au secteur énergétique algérien les moyens de solutions technologiques numériques de pointe qui favorisent l'efficacité, la sécurité et la durabilité.",
        ar: "تمكين قطاع الطاقة في الجزائر بحلول التكنولوجيا الرقمية المتطورة التي تعزز الكفاءة والسلامة والاستدامة.",
      },
    },
    {
      key: "vision",
      value: {
        en: "To be the leading digital technology partner for the oil and gas industry in North Africa, recognized for innovation, excellence, and customer success.",
        zh: "成为北非油气行业领先的数字技术合作伙伴，以创新、卓越和客户成功著称。",
        fr: "Être le partenaire technologique numérique de premier plan pour l'industrie pétrolière et gazière en Afrique du Nord.",
        ar: "أن نكون الشريك الرائد في التكنولوجيا الرقمية لصناعة النفط والغاز في شمال أفريقيا.",
      },
    },
    {
      key: "contact",
      value: {
        address: { en: "123 Energy District, Algiers, Algeria", zh: "阿尔及利亚阿尔及尔能源区123号", fr: "123 District Énergie, Alger, Algérie", ar: "123 حي الطاقة، الجزائر العاصمة، الجزائر" },
        phone: "+213 21 123 456",
        email: "contact@kld-algeria.com",
        workingHours: { en: "Sunday - Thursday: 8:00 AM - 5:00 PM", zh: "周日至周四：上午8:00 - 下午5:00", fr: "Dimanche - Jeudi: 8h00 - 17h00", ar: "الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً" },
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

  // Create timeline with descriptions
  const timelineItems = [
    {
      year: "2024",
      title: { en: "Expansion & Growth", zh: "扩张与增长", fr: "Expansion et croissance", ar: "التوسع والنمو" },
      description: { en: "Expanded operations to 5 major oil fields and launched new AI-powered solutions.", zh: "将业务扩展到5个主要油田，并推出了新的人工智能解决方案。", fr: "Expansion des opérations à 5 grands champs pétroliers et lancement de nouvelles solutions IA.", ar: "توسيع العمليات إلى 5 حقول نفطية رئيسية وإطلاق حلول جديدة مدعومة بالذكاء الاصطناعي." },
      order: 1
    },
    {
      year: "2023",
      title: { en: "Strategic Partnerships", zh: "战略合作", fr: "Partenariats stratégiques", ar: "الشراكات الاستراتيجية" },
      description: { en: "Formed strategic partnerships with major energy companies in Algeria.", zh: "与阿尔及利亚主要能源公司建立了战略合作伙伴关系。", fr: "Formation de partenariats stratégiques avec les grandes entreprises énergétiques en Algérie.", ar: "تشكيل شراكات استراتيجية مع كبرى شركات الطاقة في الجزائر." },
      order: 2
    },
    {
      year: "2022",
      title: { en: "Technology Innovation", zh: "技术创新", fr: "Innovation technologique", ar: "الابتكار التكنولوجي" },
      description: { en: "Launched our proprietary Digital Oilfield Platform with advanced analytics.", zh: "推出了具有高级分析功能的专有数字油田平台。", fr: "Lancement de notre plateforme pétrolière numérique propriétaire avec analyses avancées.", ar: "إطلاق منصتنا الرقمية الخاصة للحقول النفطية مع تحليلات متقدمة." },
      order: 3
    },
    {
      year: "2021",
      title: { en: "Market Entry", zh: "市场进入", fr: "Entrée sur le marché", ar: "دخول السوق" },
      description: { en: "Established KLD Algeria as a subsidiary of CNPC to serve the North African market.", zh: "成立昆仑数智阿尔及利亚作为中国石油的子公司，服务北非市场。", fr: "Établissement de KLD Algérie en tant que filiale de CNPC pour desservir le marché nord-africain.", ar: "تأسيس كونلون الجزائر كشركة تابعة لـ CNPC لخدمة سوق شمال أفريقيا." },
      order: 4
    },
  ];

  // Clear existing timeline and recreate
  await prisma.timeline.deleteMany();
  for (const item of timelineItems) {
    await prisma.timeline.create({ data: item });
  }
  console.log("Created timeline");

  // Create team members
  const teamMembers = [
    {
      name: { en: "Zhang Wei", zh: "张伟", fr: "Zhang Wei", ar: "تشانغ وي" },
      position: { en: "General Manager", zh: "总经理", fr: "Directeur Général", ar: "المدير العام" },
      bio: { en: "20+ years of experience in digital transformation for the energy sector.", zh: "20多年能源行业数字化转型经验。", fr: "Plus de 20 ans d'expérience dans la transformation numérique du secteur énergétique.", ar: "أكثر من 20 عاماً من الخبرة في التحول الرقمي لقطاع الطاقة." },
      image: "/uploads/team-gm.jpg",
      order: 1,
      isActive: true,
    },
    {
      name: { en: "Li Ming", zh: "李明", fr: "Li Ming", ar: "لي مينغ" },
      position: { en: "Technical Director", zh: "技术总监", fr: "Directeur Technique", ar: "المدير التقني" },
      bio: { en: "Expert in SCADA systems and industrial IoT solutions.", zh: "SCADA系统和工业物联网解决方案专家。", fr: "Expert en systèmes SCADA et solutions IoT industrielles.", ar: "خبير في أنظمة سكادا وحلول إنترنت الأشياء الصناعية." },
      image: "/uploads/team-td.jpg",
      order: 2,
      isActive: true,
    },
    {
      name: { en: "Ahmed Benali", zh: "艾哈迈德·贝纳利", fr: "Ahmed Benali", ar: "أحمد بن علي" },
      position: { en: "Operations Manager", zh: "运营经理", fr: "Directeur des Opérations", ar: "مدير العمليات" },
      bio: { en: "15 years of experience in oil field operations and project management.", zh: "15年油田运营和项目管理经验。", fr: "15 ans d'expérience dans les opérations de champs pétroliers et la gestion de projets.", ar: "15 عاماً من الخبرة في عمليات الحقول النفطية وإدارة المشاريع." },
      image: "/uploads/team-om.jpg",
      order: 3,
      isActive: true,
    },
    {
      name: { en: "Wang Fang", zh: "王芳", fr: "Wang Fang", ar: "وانغ فانغ" },
      position: { en: "Product Manager", zh: "产品经理", fr: "Chef de Produit", ar: "مدير المنتجات" },
      bio: { en: "Leads product development and innovation initiatives.", zh: "领导产品开发和创新计划。", fr: "Dirige le développement de produits et les initiatives d'innovation.", ar: "تقود تطوير المنتجات ومبادرات الابتكار." },
      image: "/uploads/team-pm.jpg",
      order: 4,
      isActive: true,
    },
  ];

  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: {
        name: { equals: member.name }
      }
    });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }
  console.log("Created team members");

  // Create banners
  const banners = [
    {
      title: { en: "Digital Solutions for Energy", zh: "能源数字化解决方案", fr: "Solutions numériques pour l'énergie", ar: "الحلول الرقمية للطاقة" },
      subtitle: { en: "Transforming Algeria's oil and gas industry with cutting-edge technology", zh: "用尖端技术改变阿尔及利亚的油气行业", fr: "Transformer l'industrie pétrolière et gazière algérienne avec une technologie de pointe", ar: "تحويل صناعة النفط والغاز الجزائرية بتقنيات متطورة" },
      image: "/uploads/banner-hero.jpg",
      link: "/products",
      order: 1,
      isActive: true,
    },
    {
      title: { en: "AI-Powered Operations", zh: "人工智能驱动运营", fr: "Opérations alimentées par l'IA", ar: "عمليات مدعومة بالذكاء الاصطناعي" },
      subtitle: { en: "Optimize production with intelligent analytics", zh: "通过智能分析优化生产", fr: "Optimisez la production avec des analyses intelligentes", ar: "تحسين الإنتاج مع التحليلات الذكية" },
      image: "/uploads/banner-ai.jpg",
      link: "/services",
      order: 2,
      isActive: true,
    },
    {
      title: { en: "Trusted Partner", zh: "值得信赖的合作伙伴", fr: "Partenaire de confiance", ar: "شريك موثوق" },
      subtitle: { en: "Working with Algeria's leading energy companies", zh: "与阿尔及利亚领先能源公司合作", fr: "Travaillant avec les principales entreprises énergétiques d'Algérie", ar: "العمل مع شركات الطاقة الرائدة في الجزائر" },
      image: "/uploads/banner-partner.jpg",
      link: "/about",
      order: 3,
      isActive: true,
    },
  ];

  for (const banner of banners) {
    const existing = await prisma.banner.findFirst({ where: { order: banner.order } });
    if (!existing) {
      await prisma.banner.create({ data: banner });
    }
  }
  console.log("Created banners");

  // Create default settings
  const settings = [
    {
      key: "siteName",
      value: { en: "KLD Algeria", zh: "昆仑数智阿尔及利亚", fr: "KLD Algérie", ar: "كونلون الجزائر" },
    },
    {
      key: "siteDescription",
      value: { en: "Digital solutions for the energy sector", zh: "能源行业数字化解决方案", fr: "Solutions numériques pour le secteur de l'énergie", ar: "حلول رقمية لقطاع الطاقة" },
    },
    {
      key: "socialLinks",
      value: {
        linkedin: "https://linkedin.com/company/kld-algeria",
        twitter: "https://twitter.com/kld_algeria",
      },
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("Created settings");

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
