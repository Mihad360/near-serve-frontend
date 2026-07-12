"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import AuthShell from "@/components/auth/AuthShell";
import { getApiErrorMessage } from "@/lib/auth/auth.utils";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { useSignUpUserMutation } from "@/redux/api/authApi";
import { ROUTES } from "@/utils/navigation";

function RoleSync({ role }: { role: "customer" | "provider" }) {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue("role", role);
  }, [role, setValue]);
  return null;
}

function RegisterFields({
  role,
  setRole,
  isLoading,
}: {
  role: "customer" | "provider";
  setRole: (r: "customer" | "provider") => void;
  isLoading: boolean;
}) {
  return (
    <>
      <RoleSync role={role} />

      <div className="mb-6">
        <p className="text-sm font-medium text-ink mb-2">I want to</p>
        <div className="grid grid-cols-2 gap-2 p-1 bg-cream rounded-2xl border border-border">
          {(
            [
              { key: "customer" as const, label: "Hire pros", icon: "🏠" },
              { key: "provider" as const, label: "Offer services", icon: "🔧" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setRole(opt.key)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                role === opt.key
                  ? "bg-ink text-white shadow-md"
                  : "text-muted hover:text-ink"
              }`}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <UseInput name="name" label="Full name" required placeholder="Your name" />
        <UseInput name="email" label="Email" type="email" required placeholder="you@email.com" />
        <UseInput name="phone" label="Phone" type="tel" required placeholder="01XXXXXXXXX" />
        <UseInput name="password" label="Password" type="password" required />
        <UseInput name="confirmPassword" label="Confirm password" type="password" required />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        loading={isLoading}
        block
        size="large"
        className="!h-12 !rounded-full !font-semibold !text-base !mt-6"
      >
        Create account — free
      </Button>

      <p className="text-[11px] text-muted text-center mt-4 leading-relaxed">
        By signing up you agree to our Terms of Service and Privacy Policy.
      </p>
    </>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpUserMutation();
  const [role, setRole] = useState<"customer" | "provider">("customer");

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const { confirmPassword: _, ...payload } = values;
      await signUp(payload).unwrap();
      toast.success("Account created! Check your email for a verification code.");
      sessionStorage.setItem("auth_email", values.email);
      router.push(`${ROUTES.OTP}?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not create account"));
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join free — post jobs or start earning as a provider."
      footer={
        <>
          <span className="text-muted">Already have an account? </span>
          <Link href={ROUTES.LOGIN} className="text-brand font-semibold hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <UseForm<RegisterFormValues>
        resolver={zodResolver(registerSchema)}
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          email: "",
          phone: "",
          role: "customer",
          password: "",
          confirmPassword: "",
        }}
      >
        <RegisterFields role={role} setRole={setRole} isLoading={isLoading} />
      </UseForm>
    </AuthShell>
  );
}
