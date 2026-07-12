"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { toast } from "sonner";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import AuthShell from "@/components/auth/AuthShell";
import { handleLoginSuccess } from "@/lib/auth/auth.handlers";
import { extractAccessToken, getApiErrorMessage } from "@/lib/auth/auth.utils";
import { decodeJwt } from "@/utils/jwt";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { ROLE_REDIRECT, ROUTES } from "@/utils/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values).unwrap();
      const token = extractAccessToken(res);

      if (!token) {
        toast.error("Login succeeded but no token was returned.");
        return;
      }

      handleLoginSuccess(token);
      toast.success("Welcome back!");

      const payload = decodeJwt(token);
      const role = payload?.role ?? "customer";
      const roleKey =
        role === "user" ? "customer" : role;
      const redirect =
        ROLE_REDIRECT[roleKey as keyof typeof ROLE_REDIRECT] ??
        ROUTES.CUSTOMER_HOME;

      router.push(redirect);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Invalid email or password"));
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your jobs, bids, and messages."
      footer={
        <>
          <span className="text-muted">Don&apos;t have an account? </span>
          <Link href={ROUTES.REGISTER} className="text-brand font-semibold hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <UseForm<LoginFormValues>
        resolver={zodResolver(loginSchema)}
        onSubmit={onSubmit}
        defaultValues={{ email: "", password: "" }}
      >
        <div className="space-y-1">
          <UseInput name="email" label="Email" type="email" required placeholder="you@email.com" />
          <UseInput name="password" label="Password" type="password" required />
        </div>

        <div className="flex justify-end mt-1 mb-6">
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-sm text-brand font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          size="large"
          className="!h-12 !rounded-full !font-semibold !text-base"
        >
          Log in
        </Button>
      </UseForm>
    </AuthShell>
  );
}
