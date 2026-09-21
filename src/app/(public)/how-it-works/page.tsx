import type { Metadata } from "next";
import HowItWorksContent from "@/components/how-it-works/HowItWorksContent";

export const metadata: Metadata = {
  title: "How It Works | NearServe",
  description:
    "Post a job in plain words, get competing bids from verified local providers, and pay only after the job is done and you are 100% satisfied.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
