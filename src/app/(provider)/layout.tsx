import type { ReactNode } from "react";
import ProviderShell from "@/components/provider/ProviderShell";

export const metadata = {
  title: "NearServe · Provider",
  description: "Browse nearby jobs, bid, and manage earnings on NearServe.",
};

export default function ProviderLayout({ children }: { children: ReactNode }) {
  return <ProviderShell>{children}</ProviderShell>;
}
