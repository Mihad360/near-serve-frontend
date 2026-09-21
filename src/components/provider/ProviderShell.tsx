"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Gavel,
  MessageSquare,
  Wallet,
  User,
  Menu,
  X,
  ClipboardList,
  LogOut,
  Landmark,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  PROVIDER_NAV,
  NAVBAR_CONFIG,
  ROUTES,
} from "@/utils/navigation";
import { cn } from "@/lib/utils";
import Avatar from "@/components/shared/app/Avatar";
import { useDemoAuth } from "@/components/providers/DemoAuthProvider";

const ICONS = {
  "layout-grid": LayoutGrid,
  gavel: Gavel,
  message: MessageSquare,
  wallet: Wallet,
  bank: Landmark,
} as const;

type ProviderShellProps = {
  children: ReactNode;
};

export default function ProviderShell({ children }: ProviderShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, role, setDemoRole } = useDemoAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayName = user?.name ?? "Alex Rivera";

  useEffect(() => {
    if (role !== "provider") setDemoRole("provider");
  }, [role, setDemoRole]);

  const isActive = (path: string) => {
    if (path === ROUTES.PROVIDER_HOME) {
      return (
        pathname === path ||
        pathname.startsWith("/provider/feed") ||
        pathname.startsWith("/provider/active")
      );
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  const navLink = (
    item: (typeof PROVIDER_NAV)[number],
    onClick?: () => void,
  ) => {
    const Icon = ICONS[item.icon as keyof typeof ICONS] ?? LayoutGrid;
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
        {item.name === "Job feed" && (
          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", active ? "bg-white/25 text-white" : "bg-emerald-100 text-emerald-800")}>
            12 new
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
          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
              Verified Pro
            </span>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              4.9
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {PROVIDER_NAV.map((item) => navLink(item))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-2 border-t border-stone-200/70">
          <Link
            href={ROUTES.PROVIDER_ONBOARDING}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all",
              isActive(ROUTES.PROVIDER_ONBOARDING)
                ? "bg-white text-ink shadow-sm"
                : "text-muted hover:bg-stone-200/60 hover:text-ink",
            )}
          >
            <ClipboardList className="size-4 text-brand" />
            <span>Verification & Skills</span>
          </Link>

          <Link
            href={ROUTES.PROVIDER_PROFILE}
            className={cn(
              "flex items-center gap-3 rounded-2xl p-3 text-sm font-semibold transition-all duration-300",
              isActive(ROUTES.PROVIDER_PROFILE)
                ? "bg-white text-ink shadow-sm ring-1 ring-stone-200"
                : "bg-white/60 hover:bg-white text-ink hover:shadow-sm",
            )}
          >
            <Avatar name={displayName} size="sm" />
            <div className="flex flex-col items-start leading-tight min-w-0 flex-1">
              <span className="truncate font-bold text-ink max-w-[130px]">{displayName}</span>
              <span className="text-[11px] text-muted font-normal">
                Payouts & Settings
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
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
              Online
            </span>
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
                  <div>
                    <span className="text-sm font-bold text-ink block truncate max-w-[130px]">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">Verified Provider</span>
                  </div>
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
                {PROVIDER_NAV.map((item) =>
                  navLink(item, () => setMobileOpen(false)),
                )}
                <Link
                  href={ROUTES.PROVIDER_ONBOARDING}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                    isActive(ROUTES.PROVIDER_ONBOARDING)
                      ? "bg-brand text-white"
                      : "text-warm hover:bg-stone-200/60",
                  )}
                >
                  <ClipboardList className="size-4" />
                  Onboarding
                </Link>
                <Link
                  href={ROUTES.PROVIDER_PROFILE}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                    isActive(ROUTES.PROVIDER_PROFILE)
                      ? "bg-brand text-white"
                      : "text-warm hover:bg-stone-200/60",
                  )}
                >
                  <User className="size-4" />
                  Profile & Payouts
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
