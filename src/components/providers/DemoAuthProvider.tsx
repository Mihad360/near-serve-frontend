"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEMO_USERS,
  type DemoRole,
  type DemoUser,
  readDemoAuth,
  writeDemoAuth,
} from "@/lib/auth/demoAuth";
import { handleLogout } from "@/lib/auth/auth.handlers";
import { ROUTES } from "@/utils/navigation";

type DemoAuthContextValue = {
  role: DemoRole;
  user: DemoUser | null;
  isLoggedIn: boolean;
  /** Design preview — switch guest / customer / provider without real login */
  setDemoRole: (role: DemoRole) => void;
  logout: () => void;
  homePath: string;
};

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<DemoRole>("guest");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRole(readDemoAuth());
    setHydrated(true);
  }, []);

  const setDemoRole = useCallback((next: DemoRole) => {
    writeDemoAuth(next);
    setRole(next);
  }, []);

  const logout = useCallback(() => {
    handleLogout();
    writeDemoAuth("guest");
    setRole("guest");
  }, []);

  const user = role === "guest" ? null : DEMO_USERS[role];

  const homePath =
    role === "customer"
      ? ROUTES.CUSTOMER_HOME
      : role === "provider"
        ? ROUTES.PROVIDER_HOME
        : role === "admin"
          ? ROUTES.ADMIN_HOME
          : ROUTES.HOME;

  const value = useMemo(
    () => ({
      role,
      user,
      isLoggedIn: role !== "guest",
      setDemoRole,
      logout,
      homePath,
    }),
    [role, user, setDemoRole, logout, homePath],
  );

  // Avoid hydration mismatch on first paint for auth-dependent UI
  if (!hydrated) {
    return (
      <DemoAuthContext.Provider
        value={{
          role: "guest",
          user: null,
          isLoggedIn: false,
          setDemoRole,
          logout,
          homePath: ROUTES.HOME,
        }}
      >
        {children}
      </DemoAuthContext.Provider>
    );
  }

  return (
    <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const ctx = useContext(DemoAuthContext);
  if (!ctx) {
    throw new Error("useDemoAuth must be used within DemoAuthProvider");
  }
  return ctx;
}
