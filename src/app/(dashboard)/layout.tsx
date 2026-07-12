import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "NearServe · Admin",
  description: "NearServe admin dashboard — providers, jobs, payments, disputes.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
