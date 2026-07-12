import type { Metadata } from "next";
import ServicesContent from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Browse Services | NearServe",
  description:
    "Explore 50+ service categories — plumbing, electrical, painting, AC repair and more. Post a job and get competing bids from verified local providers.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
