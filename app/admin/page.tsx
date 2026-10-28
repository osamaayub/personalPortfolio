import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";
import Dashboard from "@/components/admin/dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return <Dashboard dbConfigured={isDbConfigured} />;
}
