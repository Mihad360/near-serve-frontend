import type { Metadata } from "next";
import ForProvidersContent from "@/components/for-providers/ForProvidersContent";

export const metadata: Metadata = {
  title: "For Providers | NearServe",
  description:
    "Join NearServe as a verified service provider. Get matched to nearby jobs, bid on your terms, and get paid securely through escrow.",
};

export default function ForProvidersPage() {
  return <ForProvidersContent />;
}
