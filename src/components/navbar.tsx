"use client";

import { NAVBAR_CONFIG, PUBLIC_NAV, ROUTES } from "@/utils/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Pages with a dark hero — navbar uses light text until scrolled */
const DARK_HERO_PATHS = ["/for-providers"];

/** Image-heavy pages — navbar always has a frosted background */
const FROSTED_NAV_PATHS = ["/leaderboard"];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navItems = PUBLIC_NAV;

  const navLinkClass = (active: boolean) => {
    if (useLightText) {
      return active
        ? "text-white"
        : "text-white/75 hover:text-white";
    }
    return active
      ? "text-brand"
      : "text-warm hover:text-ink";
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
          showSolidBg
            ? isDarkHero && scrolled
              ? "bg-cream/95 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(26,18,8,0.06)]"
              : "bg-cream/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
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
              className={`text-sm font-medium transition-colors duration-300 ${navLinkClass(pathname === item.path)}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href={ROUTES.LOGIN}
            className={`text-sm font-medium transition-colors duration-300 ${
              useLightText
                ? "text-white/80 hover:text-white"
                : "text-warm hover:text-ink"
            }`}
          >
            Log in
          </Link>
          <Link
            href={NAVBAR_CONFIG.CTA_PATH}
            className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
              useLightText
                ? "bg-white text-ink hover:bg-brand hover:text-white shadow-lg"
                : "bg-ink text-cream hover:bg-brand"
            }`}
          >
            {NAVBAR_CONFIG.CTA_TEXT}
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center relative z-10"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`absolute h-0.5 w-6 rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                useLightText && !menuOpen ? "bg-white" : "bg-ink"
              } ${
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
                      : "translate-y-2"
              }`}
            />
          ))}
        </button>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-cream shadow-2xl flex flex-col justify-center px-8 gap-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`text-4xl font-fraunces font-bold text-ink hover:text-brand transition-all duration-500 ${
                menuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
              style={{
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms",
              }}
            >
              {item.name}
            </Link>
          ))}

          <div
            className={`mt-8 pt-8 border-t border-border transition-all duration-500 ${
              menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: menuOpen ? "450ms" : "0ms" }}
          >
            <Link
              href={ROUTES.LOGIN}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-semibold text-warm mb-4"
            >
              Log in
            </Link>
            <Link
              href={NAVBAR_CONFIG.CTA_PATH}
              onClick={() => setMenuOpen(false)}
              className="block w-full px-6 py-4 bg-ink rounded-full text-cream text-sm font-semibold text-center hover:bg-brand transition-colors"
            >
              {NAVBAR_CONFIG.CTA_TEXT}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
