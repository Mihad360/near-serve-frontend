import Link from "next/link";
import { NAVBAR_CONFIG, PUBLIC_NAV, ROUTES } from "@/utils/navigation";

const FOOTER_LINKS = {
  product: [
    { label: "How it works", href: ROUTES.HOW_IT_WORKS },
    { label: "Browse services", href: ROUTES.SERVICES },
    { label: "Leaderboard", href: ROUTES.LEADERBOARD },
    { label: "For providers", href: ROUTES.FOR_PROVIDERS },
  ],
  company: [
    { label: "About us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy policy", href: "#" },
    { label: "Terms of service", href: "#" },
  ],
  account: [
    { label: "Log in", href: ROUTES.LOGIN },
    { label: "Sign up", href: ROUTES.REGISTER },
    { label: "Post a job", href: ROUTES.CUSTOMER_POST_JOB },
    { label: "Join as provider", href: ROUTES.PROVIDER_ONBOARDING },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="max-w-360 mx-auto px-6 md:px-12 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href={ROUTES.HOME}
              className="font-fraunces text-2xl font-bold tracking-tight inline-block"
            >
              <span className="text-white">{NAVBAR_CONFIG.LOGO_TEXT}</span>
              <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-sm">
              The local services marketplace where verified providers compete
              for your job. Safe escrow payments. AI-powered matching.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
              <span className="text-xs text-white/50">
                847 providers active right now
              </span>
            </div>
          </div>

          {/* Link columns */}
          {(
            [
              { title: "Product", links: FOOTER_LINKS.product },
              { title: "Company", links: FOOTER_LINKS.company },
              { title: "Get started", links: FOOTER_LINKS.account },
            ] as const
          ).map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <div className="font-fraunces text-xl font-semibold">
              Ready to get it done?
            </div>
            <p className="text-sm text-white/60 mt-1">
              Post a job free — providers start bidding within minutes.
            </p>
          </div>
          <Link
            href={ROUTES.CUSTOMER_POST_JOB}
            className="shrink-0 bg-brand text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-brand-dark transition-colors duration-300"
          >
            {NAVBAR_CONFIG.CTA_TEXT} →
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} NearServe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
