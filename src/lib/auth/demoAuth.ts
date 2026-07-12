export type DemoRole = "guest" | "customer" | "provider" | "admin";

export type DemoUser = {
  role: Exclude<DemoRole, "guest">;
  name: string;
  email: string;
  /** Provider only — mirrors backend isApproved */
  isApproved?: boolean;
};

export const DEMO_AUTH_KEY = "nearserve_demo_auth";

export const DEMO_USERS: Record<Exclude<DemoRole, "guest">, DemoUser> = {
  customer: {
    role: "customer",
    name: "Maya Chen",
    email: "maya.chen@email.com",
  },
  provider: {
    role: "provider",
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    isApproved: true,
  },
  admin: {
    role: "admin",
    name: "NearServe Admin",
    email: "admin@nearserve.com",
  },
};

export function readDemoAuth(): DemoRole {
  if (typeof window === "undefined") return "guest";
  try {
    const raw = localStorage.getItem(DEMO_AUTH_KEY);
    if (
      raw === "customer" ||
      raw === "provider" ||
      raw === "guest" ||
      raw === "admin"
    ) {
      return raw;
    }
  } catch {
    /* ignore */
  }
  return "guest";
}

export function writeDemoAuth(role: DemoRole) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DEMO_AUTH_KEY, role);
  } catch {
    /* ignore */
  }
}
