"use client";

import { NAVBAR_CONFIG, PUBLIC_NAV, ROUTES } from "@/utils/navigation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, MessageSquare } from "lucide-react";
import { useDemoAuth } from "@/components/providers/DemoAuthProvider";
import Avatar from "@/components/shared/app/Avatar";
import { cn } from "@/lib/utils";

const DARK_HERO_PATHS = ["/for-providers"];
const FROSTED_NAV_PATHS = ["/leaderboard"];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, user, isLoggedIn, logout, homePath } = useDemoAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isDarkHero = DARK_HERO_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const isFrosted = FROSTED_NAV_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  const useLightText = isDarkHero && !scrolled && !menuOpen;
  const showSolidBg = scrolled || isFrosted || menuOpen;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!userMenuRef.current?.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const navItems = PUBLIC_NAV;

  const primaryCta =
    role === "customer"
      ? { label: "Post a job", href: ROUTES.CUSTOMER_POST_JOB }
      : role === "provider"
        ? { label: "Job feed", href: ROUTES.PROVIDER_HOME }
        : role === "admin"
          ? { label: "Admin", href: ROUTES.ADMIN_HOME }
          : { label: NAVBAR_CONFIG.CTA_TEXT, href: NAVBAR_CONFIG.CTA_PATH };

  const messagesHref =
    role === "customer"
      ? ROUTES.CUSTOMER_MESSAGES
      : role === "provider"
        ? ROUTES.PROVIDER_MESSAGES
        : null;

  const navLinkClass = (active: boolean) => {
    if (useLightText) {
      return active ? "text-white" : "text-white/75 hover:text-white";
    }
    return active ? "text-brand" : "text-warm hover:text-ink";
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
    router.push(ROUTES.HOME);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500",
          showSolidBg
            ? isDarkHero && scrolled
              ? "bg-cream/95 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(26,18,8,0.06)]"
              : "bg-cream/90 backdrop-blur-md border-b border-border"
            : "bg-transparent",
        )}
      >
        <Link
          href={ROUTES.HOME}
          className="font-fraunces text-[22px] font-bold tracking-tight z-10"
        >
          <span className={useLightText ? "text-white" : "text-ink"}>
            {NAVBAR_CONFIG.LOGO_TEXT}
          </span>
          <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                navLinkClass(pathname === item.path),
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                href={ROUTES.LOGIN}
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  useLightText
                    ? "text-white/80 hover:text-white"
                    : "text-warm hover:text-ink",
                )}
              >
                Log in
              </Link>
              <Link
                href={primaryCta.href}
                className={cn(
                  "text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300",
                  useLightText
                    ? "bg-white text-ink hover:bg-brand hover:text-white shadow-lg"
                    : "bg-ink text-cream hover:bg-brand",
                )}
              >
                {primaryCta.label}
              </Link>
            </>
          ) : (
            <>
              {messagesHref && (
                <Link
                  href={messagesHref}
                  className={cn(
                    "p-2.5 rounded-full transition-colors duration-300",
                    useLightText
                      ? "text-white/80 hover:bg-white/10 hover:text-white"
                      : "text-warm hover:bg-white hover:text-ink",
                  )}
                  aria-label="Messages"
                >
                  <MessageSquare className="size-4.5 size-[18px]" />
                </Link>
              )}
              <Link
                href={primaryCta.href}
                className={cn(
                  "text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300",
                  useLightText
                    ? "bg-white text-ink hover:bg-brand hover:text-white shadow-lg"
                    : "bg-brand text-white hover:bg-brand-dark shadow-[0_4px_16px_rgba(199,10,36,0.25)]",
                )}
              >
                {primaryCta.label}
              </Link>

              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-2 rounded-full pl-1.5 pr-2.5 py-1.5 transition-all duration-300",
                    useLightText
                      ? "bg-white/15 hover:bg-white/25 border border-white/20"
                      : "bg-white border border-border hover:border-border-warm shadow-sm",
                  )}
                >
                  <Avatar name={user!.name} size="sm" />
                  <span
                    className={cn(
                      "text-sm font-semibold max-w-[100px] truncate",
                      useLightText ? "text-white" : "text-ink",
                    )}
                  >
                    {user!.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-300",
                      useLightText ? "text-white/70" : "text-muted",
                      userMenuOpen && "rotate-180",
                    )}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border bg-cream shadow-[0_12px_40px_rgba(26,18,8,0.12)] overflow-hidden animate-fade-up z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-ink truncate">
                        {user!.name}
                      </p>
                      <p className="text-[11px] text-muted truncate">
                        {user!.email}
                      </p>
                      <span className="mt-1.5 inline-block text-[10px] font-semibold uppercase tracking-wider text-brand bg-brand/10 rounded-full px-2 py-0.5">
                        {role}
                      </span>
                    </div>
                    <div className="p-1.5">
                      <Link
                        href={homePath}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-warm hover:bg-white hover:text-ink transition-colors"
                      >
                        <LayoutDashboard className="size-4" />
                        {role === "customer"
                          ? "My jobs"
                          : role === "provider"
                            ? "Job feed"
                            : "Dashboard"}
                      </Link>
                      {messagesHref && (
                        <Link
                          href={messagesHref}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-warm hover:bg-white hover:text-ink transition-colors"
                        >
                          <MessageSquare className="size-4" />
                          Messages
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-[#8b1a1a] hover:bg-[#f5e6e6] transition-colors"
                      >
                        <LogOut className="size-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center relative z-10"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "absolute h-0.5 w-6 rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]",
                useLightText && !menuOpen ? "bg-white" : "bg-ink",
                i === 0
                  ? menuOpen
                    ? "rotate-45 translate-y-0"
                    : "-translate-y-2"
                  : i === 1
                    ? menuOpen
                      ? "opacity-0 scale-x-0"
                      : "opacity-100"
                    : menuOpen
                      ? "-rotate-45 translate-y-0"
                      : "translate-y-2",
              )}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-all duration-500",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[85%] max-w-sm bg-cream shadow-2xl flex flex-col justify-center px-8 gap-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-4xl font-fraunces font-bold text-ink hover:text-brand transition-all duration-500",
                menuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8",
              )}
              style={{
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms",
              }}
            >
              {item.name}
            </Link>
          ))}

          <div
            className={cn(
              "mt-8 pt-8 border-t border-border transition-all duration-500 space-y-3",
              menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
            style={{ transitionDelay: menuOpen ? "450ms" : "0ms" }}
          >
            {!isLoggedIn ? (
              <>
                <Link
                  href={ROUTES.LOGIN}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-semibold text-warm"
                >
                  Log in
                </Link>
                <Link
                  href={primaryCta.href}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-6 py-4 bg-ink rounded-full text-cream text-sm font-semibold text-center hover:bg-brand transition-colors"
                >
                  {primaryCta.label}
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar name={user!.name} size="md" />
                  <div>
                    <p className="font-semibold text-ink">{user!.name}</p>
                    <p className="text-xs text-muted capitalize">{role}</p>
                  </div>
                </div>
                <Link
                  href={homePath}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-6 py-4 bg-brand rounded-full text-white text-sm font-semibold text-center"
                >
                  Go to{" "}
                  {role === "customer"
                    ? "My jobs"
                    : role === "provider"
                      ? "Job feed"
                      : "Admin"}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full text-sm font-semibold text-[#8b1a1a] text-center py-2"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
