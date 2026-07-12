import type { ReactNode } from "react";
import CustomerShell from "@/components/customer/CustomerShell";

export const metadata = {
  title: "NearServe · Customer",
  description: "Manage your jobs, messages, and payments on NearServe.",
};

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <CustomerShell>{children}</CustomerShell>;
}
