"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  Plus,
  MessageSquare,
  CreditCard,
  User,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  CUSTOMER_NAV,
  NAVBAR_CONFIG,
  ROUTES,
} from "@/utils/navigation";
import { cn } from "@/lib/utils";
import Avatar from "@/components/shared/app/Avatar";
import { useDemoAuth } from "@/components/providers/DemoAuthProvider";

const ICONS = {
  briefcase: Briefcase,
  plus: Plus,
  message: MessageSquare,
  "credit-card": CreditCard,
} as const;

type CustomerShellProps = {
  children: ReactNode;
};

export default function CustomerShell({ children }: CustomerShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, role, setDemoRole } = useDemoAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayName = user?.name ?? "Maya Chen";

  useEffect(() => {
    if (role !== "customer") setDemoRole("customer");
  }, [role, setDemoRole]);

  const isActive = (path: string) => {
    if (path === ROUTES.CUSTOMER_HOME) {
      return pathname === path || pathname.startsWith("/customer/jobs");
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  const navLink = (
    item: (typeof CUSTOMER_NAV)[number],
    onClick?: () => void,
  ) => {
    const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Briefcase;
    const active = isActive(item.path);
    return (
      <Link
        key={item.path}
        href={item.path}
        onClick={onClick}
        data-active={active}
        className={cn(
          "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300",
          active
            ? "bg-brand text-white shadow-md shadow-brand/20 translate-x-1"
            : "text-warm hover:bg-stone-200/60 hover:text-ink hover:translate-x-1",
        )}
      >
        <Icon className={cn("size-4 shrink-0 transition-transform", active ? "scale-110" : "text-muted")} />
        <span className="flex-1">{item.name}</span>
        {item.name === "Messages" && (
          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", active ? "bg-white/25 text-white" : "bg-stone-200 text-ink")}>
            2
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[270px] shrink-0 flex-col bg-stone-100/90 border-r border-stone-200/70 sticky top-0 h-screen shadow-sm">
        <div className="p-6 pb-5">
          <Link
            href={ROUTES.HOME}
            className="font-fraunces text-2xl font-bold tracking-tight inline-block transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="text-ink">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            Customer Workspace
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {CUSTOMER_NAV.map((item) => navLink(item))}
        </nav>

        {/* Action button & User Profile */}
        <div className="p-4 space-y-3 border-t border-stone-200/70">
          <Link
            href={ROUTES.CUSTOMER_POST_JOB}
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-brand hover:bg-brand-dark text-white text-sm font-bold py-3.5 shadow-md shadow-brand/25 transition-all duration-300 hover:scale-[1.02]"
          >
            <Plus className="size-4" />
            <span>Post a New Job</span>
          </Link>

          <Link
            href={ROUTES.CUSTOMER_PROFILE}
            className={cn(
              "flex items-center gap-3 rounded-2xl p-3 text-sm font-semibold transition-all duration-300",
              isActive(ROUTES.CUSTOMER_PROFILE)
                ? "bg-white text-ink shadow-sm ring-1 ring-stone-200"
                : "bg-white/60 hover:bg-white text-ink hover:shadow-sm",
            )}
          >
            <Avatar name={displayName} size="sm" />
            <div className="flex flex-col items-start leading-tight min-w-0 flex-1">
              <span className="truncate font-bold text-ink max-w-[130px]">{displayName}</span>
              <span className="text-[11px] text-muted font-normal">
                Account & Settings
              </span>
            </div>
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-muted hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="size-3.5" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-stone-100/95 backdrop-blur-md border-b border-stone-200/70 px-4 py-3 flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="font-fraunces text-xl font-bold tracking-tight"
          >
            <span className="text-ink">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={ROUTES.CUSTOMER_POST_JOB}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-xs font-bold px-3.5 py-2 shadow-sm"
            >
              <Plus className="size-3.5" />
              New Job
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-xl bg-white text-ink shadow-sm border border-stone-200"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-[280px] bg-stone-100 p-5 flex flex-col shadow-2xl animate-[slide-in-right_0.35s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <Avatar name={displayName} size="sm" />
                  <span className="text-sm font-bold text-ink truncate max-w-[150px]">
                    {displayName}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-200 text-muted"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="space-y-1.5 flex-1 overflow-y-auto">
                {CUSTOMER_NAV.map((item) =>
                  navLink(item, () => setMobileOpen(false)),
                )}
                <Link
                  href={ROUTES.CUSTOMER_PROFILE}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                    isActive(ROUTES.CUSTOMER_PROFILE)
                      ? "bg-brand text-white"
                      : "text-warm hover:bg-stone-200/60",
                  )}
                >
                  <User className="size-4" />
                  Profile
                </Link>
              </nav>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 flex items-center gap-2 text-sm font-bold text-red-700 p-2 rounded-xl hover:bg-red-50"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-10 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
