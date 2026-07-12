import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password | NearServe",
  description: "Reset your NearServe password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
