import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in | NearServe",
  description: "Log in to your NearServe account",
};

export default function LoginPage() {
  return <LoginForm />;
}
