"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { toast } from "sonner";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import AuthShell from "@/components/auth/AuthShell";
import { getApiErrorMessage } from "@/lib/auth/auth.utils";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/auth";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { ROUTES } from "@/utils/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await forgetPassword(values).unwrap();
      toast.success("Verification code sent to your email.");
      sessionStorage.setItem("auth_email", values.email);
      router.push(`${ROUTES.OTP}?email=${encodeURIComponent(values.email)}&reset=1`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not send reset code"));
    }
  };

  return (
    <AuthShell
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a verification code."
      footer={
        <Link href={ROUTES.LOGIN} className="text-brand font-semibold hover:underline">
          ← Back to log in
        </Link>
      }
    >
      <UseForm<ForgotPasswordFormValues>
        resolver={zodResolver(forgotPasswordSchema)}
        onSubmit={onSubmit}
        defaultValues={{ email: "" }}
      >
        <UseInput name="email" label="Email" type="email" required placeholder="you@email.com" />

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          size="large"
          className="!h-12 !rounded-full !font-semibold !text-base !mt-6"
        >
          Send verification code
        </Button>
      </UseForm>
    </AuthShell>
  );
}
