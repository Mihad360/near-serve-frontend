import type { Metadata } from "next";
import HowItWorksContent from "@/components/how-it-works/HowItWorksContent";

export const metadata: Metadata = {
  title: "How It Works | NearServe",
  description:
    "Post a job in plain words, get competing bids from verified local providers, and pay safely through escrow until you're satisfied.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
