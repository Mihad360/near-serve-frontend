"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  HardHat,
  Users,
  Briefcase,
  CreditCard,
  Scale,
  Star,
  Menu,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ADMIN_NAV, NAVBAR_CONFIG, ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import Avatar from "@/components/shared/app/Avatar";
import { useDemoAuth } from "@/components/providers/DemoAuthProvider";

const ICONS = {
  "layout-dashboard": LayoutDashboard,
  "hard-hat": HardHat,
  users: Users,
  briefcase: Briefcase,
  "credit-card": CreditCard,
  scale: Scale,
  star: Star,
} as const;

type AdminShellProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, role, setDemoRole } = useDemoAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayName = user?.name ?? "NearServe Admin";

  useEffect(() => {
    if (role !== "admin") setDemoRole("admin");
  }, [role, setDemoRole]);

  const isActive = (path: string) => {
    if (path === ROUTES.ADMIN_HOME) return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  const navLink = (
    item: (typeof ADMIN_NAV)[number],
    onClick?: () => void,
  ) => {
    const Icon = ICONS[item.icon as keyof typeof ICONS] ?? LayoutDashboard;
    const active = isActive(item.path);
    return (
      <Link
        key={item.path}
        href={item.path}
        onClick={onClick}
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
            href={ROUTES.ADMIN_HOME}
            className="font-fraunces text-2xl font-bold tracking-tight inline-block"
          >
            <span className="text-ink">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Admin
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {ADMIN_NAV.map((item) => navLink(item))}
        </nav>

        <div className="p-4 border-t border-border/80 space-y-2">
          <Link
            href={ROUTES.ADMIN_SETTINGS}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium",
              isActive(ROUTES.ADMIN_SETTINGS)
                ? "bg-white text-ink"
                : "text-warm hover:bg-white/75 hover:text-ink",
            )}
          >
            <Settings className="size-4" />
            Settings
          </Link>
          <div className="flex items-center gap-3 rounded-xl bg-white/60 border border-border px-3 py-2.5">
            <Avatar name={displayName} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-muted truncate">
                {user?.email ?? "admin@nearserve.com"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-muted hover:text-[#8b1a1a] hover:bg-[#f5e6e6]"
              aria-label="Log out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-cream/95 backdrop-blur-md">
          <Link href={ROUTES.ADMIN_HOME} className="font-fraunces text-xl font-bold">
            <span className="text-ink">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl border border-border bg-white"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </header>

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <button
              type="button"
              className="absolute inset-0 bg-black/30"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[82%] max-w-xs bg-cream shadow-2xl flex flex-col p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="font-fraunces text-lg font-bold text-ink">Admin</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="space-y-1 flex-1 overflow-y-auto">
                {ADMIN_NAV.map((item) =>
                  navLink(item, () => setMobileOpen(false)),
                )}
                <Link
                  href={ROUTES.ADMIN_SETTINGS}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-warm"
                >
                  <Settings className="size-4" />
                  Settings
                </Link>
              </nav>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#8b1a1a]"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
