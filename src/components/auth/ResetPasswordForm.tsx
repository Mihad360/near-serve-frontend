"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import AuthShell from "@/components/auth/AuthShell";
import { getApiErrorMessage } from "@/lib/auth/auth.utils";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validations/auth";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { ROUTES } from "@/utils/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") ?? "";
  const [storedOtp, setStoredOtp] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStoredOtp(sessionStorage.getItem("auth_otp") ?? "");
    }
  }, []);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const { confirmPassword: _, ...payload } = values;
      await resetPassword(payload).unwrap();
      toast.success("Password updated! You can log in now.");
      sessionStorage.removeItem("auth_otp");
      router.push(ROUTES.LOGIN);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not reset password"));
    }
  };

  return (
    <AuthShell
      title="Set new password"
      subtitle="Choose a strong password for your account."
      footer={
        <Link href={ROUTES.LOGIN} className="text-brand font-semibold hover:underline">
          ← Back to log in
        </Link>
      }
    >
      <UseForm<ResetPasswordFormValues>
        resolver={zodResolver(resetPasswordSchema)}
        onSubmit={onSubmit}
        defaultValues={{
          email: emailParam,
          otp: storedOtp,
          password: "",
          confirmPassword: "",
        }}
      >
        <div className="space-y-1">
          <UseInput name="email" label="Email" type="email" required readOnly />
          <UseInput name="otp" label="Verification code" required />
          <UseInput name="password" label="New password" type="password" required />
          <UseInput
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            required
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          size="large"
          className="!h-12 !rounded-full !font-semibold !text-base !mt-6"
        >
          Update password
        </Button>
      </UseForm>
    </AuthShell>
  );
}
