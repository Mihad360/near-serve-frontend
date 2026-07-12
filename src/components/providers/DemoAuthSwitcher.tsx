"use client";

import { useDemoAuth } from "@/components/providers/DemoAuthProvider";
import type { DemoRole } from "@/lib/auth/demoAuth";
import { cn } from "@/lib/utils";

const OPTIONS: { role: DemoRole; label: string }[] = [
  { role: "guest", label: "Guest" },
  { role: "customer", label: "Customer" },
  { role: "provider", label: "Provider" },
  { role: "admin", label: "Admin" },
];

/**
 * Design-only switcher so you can preview navbar + shells as guest / logged-in roles.
 * Remove or hide before production.
 */
export default function DemoAuthSwitcher() {
  const { role, setDemoRole } = useDemoAuth();

  return (
    <div className="fixed bottom-4 left-4 z-[90] flex flex-col gap-1.5 rounded-2xl border border-border bg-cream/95 backdrop-blur-md shadow-[0_8px_32px_rgba(26,18,8,0.14)] p-2 max-w-[200px]">
      <p className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
        Preview as
      </p>
      <div className="flex flex-col gap-1">
        {OPTIONS.map((opt) => (
          <button
            key={opt.role}
            type="button"
            onClick={() => setDemoRole(opt.role)}
            className={cn(
              "rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all duration-300",
              role === opt.role
                ? "bg-ink text-white shadow-sm"
                : "text-warm hover:bg-white hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
