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

  // Design preview: entering the provider app implies provider session
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
          "app-nav-link flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium",
          active
            ? "bg-brand text-white shadow-[0_6px_20px_rgba(199,10,36,0.28)]"
            : "text-warm hover:bg-white/75 hover:text-ink",
        )}
      >
        <Icon className="size-4 shrink-0" />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="min-h-screen app-shell-bg flex">
      <aside className="hidden lg:flex w-[260px] shrink-0 flex-col border-r border-border/80 app-sidebar-bg sticky top-0 h-screen">
        <div className="p-6 pb-5">
          <Link
            href={ROUTES.HOME}
            className="font-fraunces text-2xl font-bold tracking-tight inline-block transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="text-ink">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted font-medium">
            Provider
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {PROVIDER_NAV.map((item) => navLink(item))}
        </nav>

        <div className="p-4 space-y-1 border-t border-border/80">
          <Link
            href={ROUTES.PROVIDER_ONBOARDING}
            className={cn(
              "app-nav-link flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium",
              isActive(ROUTES.PROVIDER_ONBOARDING)
                ? "bg-white text-ink border border-border shadow-sm"
                : "text-warm hover:bg-white/75 hover:text-ink",
            )}
          >
            <ClipboardList className="size-4" />
            Onboarding
          </Link>
          <Link
            href={ROUTES.PROVIDER_PROFILE}
            className={cn(
              "app-nav-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
              isActive(ROUTES.PROVIDER_PROFILE)
                ? "bg-white text-ink border border-border shadow-sm"
                : "text-warm hover:bg-white/75 hover:text-ink",
            )}
          >
            <Avatar name={displayName} size="sm" />
            <span className="flex flex-col items-start leading-tight min-w-0">
              <span className="truncate max-w-[140px]">{displayName}</span>
              <span className="text-[10px] text-muted font-normal normal-case tracking-normal">
                Account & payouts
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted hover:bg-white/75 hover:text-[#8b1a1a] transition-colors"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-border/80 px-4 py-3 flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="font-fraunces text-xl font-bold tracking-tight"
          >
            <span className="text-ink">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-xl border border-border bg-white/90 text-ink shadow-sm"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </header>

        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-[280px] app-shell-bg border-l border-border p-4 flex flex-col shadow-2xl animate-[slide-in-right_0.45s_cubic-bezier(0.22,1,0.36,1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Avatar name={displayName} size="sm" />
                  <span className="text-sm font-semibold text-ink">
                    {displayName}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="space-y-1 flex-1">
                {PROVIDER_NAV.map((item) =>
                  navLink(item, () => setMobileOpen(false)),
                )}
                <Link
                  href={ROUTES.PROVIDER_ONBOARDING}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "app-nav-link flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium",
                    isActive(ROUTES.PROVIDER_ONBOARDING)
                      ? "bg-brand text-white"
                      : "text-warm hover:bg-white/70",
                  )}
                >
                  <ClipboardList className="size-4" />
                  Onboarding
                </Link>
                <Link
                  href={ROUTES.PROVIDER_PROFILE}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "app-nav-link flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium",
                    isActive(ROUTES.PROVIDER_PROFILE)
                      ? "bg-brand text-white"
                      : "text-warm hover:bg-white/70",
                  )}
                >
                  <User className="size-4" />
                  Profile
                </Link>
              </nav>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-[#8b1a1a]"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-10 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
