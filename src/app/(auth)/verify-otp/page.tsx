import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";

export const metadata: Metadata = {
  title: "Verify email | NearServe",
  description: "Verify your email address",
};

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <VerifyOtpForm />
    </Suspense>
  );
}
