import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Sign up | NearServe",
  description: "Create your NearServe account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
