import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let session = null;
  try {
    session = await auth();
  } catch {
    // 数据库未连接时，跳过认证检查
    // 在开发模式下允许访问后台
    if (process.env.NODE_ENV === "production") {
      redirect(`/${locale}/admin/login`);
    }
  }

  if (!session && process.env.NODE_ENV === "production") {
    redirect(`/${locale}/admin/login`);
  }

  // 开发模式下的模拟用户
  const user = session?.user || {
    id: "dev",
    name: "Developer",
    email: "dev@kld-algeria.com",
    role: "admin",
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminSidebar locale={locale} />
      <div className="lg:pl-64">
        <AdminHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
