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
import { verifyOtpSchema, type VerifyOtpFormValues } from "@/lib/validations/auth";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/redux/api/authApi";
import { ROUTES } from "@/utils/navigation";

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReset = searchParams.get("reset") === "1";
  const emailParam = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(emailParam);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resending }] = useResendOtpMutation();

  useEffect(() => {
    if (!email && typeof window !== "undefined") {
      setEmail(sessionStorage.getItem("auth_email") ?? "");
    }
  }, [email]);

  const onSubmit = async (values: VerifyOtpFormValues) => {
    try {
      await verifyOtp(values).unwrap();
      toast.success("Email verified!");
      sessionStorage.setItem("auth_email", values.email);
      sessionStorage.setItem("auth_otp", values.otp);

      if (isReset) {
        router.push(
          `${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(values.email)}`,
        );
      } else {
        router.push(ROUTES.LOGIN);
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Invalid verification code"));
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }
    try {
      await resendOtp(email).unwrap();
      toast.success("New code sent!");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not resend code"));
    }
  };

  return (
    <AuthShell
      title="Verify your email"
      subtitle={
        isReset
          ? "Enter the code we sent to reset your password."
          : "Enter the 6-digit code sent to your email."
      }
      footer={
        <Link href={ROUTES.LOGIN} className="text-brand font-semibold hover:underline">
          ← Back to log in
        </Link>
      }
    >
      <UseForm<VerifyOtpFormValues>
        resolver={zodResolver(verifyOtpSchema)}
        onSubmit={onSubmit}
        defaultValues={{ email: emailParam, otp: "" }}
      >
        <div className="space-y-1">
          <UseInput name="email" label="Email" type="email" required />
          <UseInput
            name="otp"
            label="Verification code"
            required
            placeholder="Enter code"
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
          Verify code
        </Button>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="w-full text-sm text-brand font-medium mt-4 hover:underline disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend code"}
        </button>
      </UseForm>
    </AuthShell>
  );
}
