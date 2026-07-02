import type { ReactNode } from "react";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Sidebar />
      <DashboardNavbar />
      {children}
    </>
  );
}
