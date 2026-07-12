"use client";

import { useDemoAuth } from "@/components/providers/DemoAuthProvider";
import { ROUTES } from "@/utils/navigation";

/**
 * Public CTA targets shaped for login-gated product flows.
 * Guest → register / login; logged-in roles → their primary action.
 */
export function useAuthCta() {
  const { role, isLoggedIn } = useDemoAuth();

  if (role === "customer") {
    return {
      isLoggedIn,
      role,
      primary: { href: ROUTES.CUSTOMER_POST_JOB, label: "Post a job" },
      secondary: { href: ROUTES.CUSTOMER_HOME, label: "My jobs" },
      providerJoin: { href: ROUTES.PROVIDER_HOME, label: "Open job feed" },
    };
  }

  if (role === "provider") {
    return {
      isLoggedIn,
      role,
      primary: { href: ROUTES.PROVIDER_HOME, label: "Browse job feed" },
      secondary: { href: ROUTES.PROVIDER_MY_BIDS, label: "My bids" },
      providerJoin: { href: ROUTES.PROVIDER_HOME, label: "Open job feed" },
    };
  }

  if (role === "admin") {
    return {
      isLoggedIn,
      role,
      primary: { href: ROUTES.ADMIN_HOME, label: "Open admin" },
      secondary: { href: ROUTES.ADMIN_PROVIDERS, label: "Providers" },
      providerJoin: { href: ROUTES.ADMIN_HOME, label: "Admin" },
    };
  }

  return {
    isLoggedIn,
    role,
    primary: { href: ROUTES.REGISTER, label: "Get started" },
    secondary: { href: ROUTES.LOGIN, label: "Log in" },
    providerJoin: { href: ROUTES.REGISTER, label: "Join as a provider" },
  };
}
