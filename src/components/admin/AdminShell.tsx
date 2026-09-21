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
  Shield,
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
          "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300",
          active
            ? "bg-brand text-white shadow-md shadow-brand/20 translate-x-1"
            : "text-warm hover:bg-stone-200/60 hover:text-ink hover:translate-x-1",
        )}
      >
        <Icon className={cn("size-4 shrink-0 transition-transform", active ? "scale-110" : "text-muted")} />
        <span className="flex-1">{item.name}</span>
        {item.name === "Providers" && (
          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", active ? "bg-white/25 text-white" : "bg-amber-100 text-amber-900")}>
            3 pending
          </span>
        )}
        {item.name === "Disputes" && (
          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", active ? "bg-white/25 text-white" : "bg-red-100 text-red-900")}>
            1 open
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
            href={ROUTES.ADMIN_HOME}
            className="font-fraunces text-2xl font-bold tracking-tight inline-block transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="text-ink">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-red-700 font-bold bg-red-50 border border-red-200/60 rounded-full px-2.5 py-0.5 w-fit">
            <Shield className="size-3" />
            Super Admin
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {ADMIN_NAV.map((item) => navLink(item))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-stone-200/70 space-y-2">
          <Link
            href={ROUTES.ADMIN_SETTINGS}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all",
              isActive(ROUTES.ADMIN_SETTINGS)
                ? "bg-white text-ink shadow-sm ring-1 ring-stone-200"
                : "text-muted hover:bg-stone-200/60 hover:text-ink",
            )}
          >
            <Settings className="size-4 text-brand" />
            <span>Platform Settings</span>
          </Link>

          <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-sm border border-stone-200/60">
            <Avatar name={displayName} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-muted truncate">
                {user?.email ?? "admin@nearserve.com"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-muted hover:text-red-700 hover:bg-red-50 transition-colors"
              aria-label="Log out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-3 px-4 py-3 border-b border-stone-200 bg-stone-100/95 backdrop-blur-md">
          <Link href={ROUTES.ADMIN_HOME} className="font-fraunces text-xl font-bold">
            <span className="text-ink">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-white text-ink border border-stone-200 shadow-sm"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </header>

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[82%] max-w-xs bg-stone-100 shadow-2xl flex flex-col p-5 animate-[slide-in-left_0.35s_ease-out]">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200">
                <p className="font-fraunces text-lg font-bold text-ink">Admin Control</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-muted rounded-lg hover:bg-stone-200"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="space-y-1.5 flex-1 overflow-y-auto">
                {ADMIN_NAV.map((item) =>
                  navLink(item, () => setMobileOpen(false)),
                )}
                <Link
                  href={ROUTES.ADMIN_SETTINGS}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-warm"
                >
                  <Settings className="size-4" />
                  Settings
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
