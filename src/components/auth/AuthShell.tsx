"use client";

import Link from "next/link";
import { NAVBAR_CONFIG, ROUTES } from "@/utils/navigation";
import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  footer?: ReactNode;
};

export default function AuthShell({
  children,
  title,
  subtitle,
  footer,
}: AuthShellProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cream">
      {/* Brand panel */}
      <div className="relative lg:w-[45%] xl:w-[42%] bg-ink text-white flex flex-col justify-between p-8 md:p-12 lg:min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(199,10,36,0.35)_0%,transparent_55%)]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link
            href={ROUTES.HOME}
            className="font-fraunces text-2xl font-bold tracking-tight inline-block"
          >
            <span className="text-white">{NAVBAR_CONFIG.LOGO_TEXT}</span>
            <span className="text-brand">{NAVBAR_CONFIG.LOGO_HIGHLIGHT}</span>
          </Link>
        </div>

        <div className="relative z-10 my-10 lg:my-0">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
            847 providers active now
          </div>
          <h1 className="font-fraunces text-3xl md:text-4xl xl:text-5xl font-semibold leading-[1.1] mb-4">
            Local pros.
            <br />
            <em className="not-italic text-brand">Competing</em> for
            <br />
            your job.
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-sm leading-relaxed">
            Create an account. Get bids from verified providers. Pay safely
            through secure payment hold until you&apos;re happy.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
            {[
              { val: "4,800+", label: "Jobs done" },
              { val: "4.9★", label: "Avg rating" },
              { val: "100%", label: "Escrow safe" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-fraunces text-xl font-bold">{s.val}</div>
                <div className="text-[10px] text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/30 hidden lg:block">
          © {new Date().getFullYear()} NearServe
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8">
            <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-ink">
              {title}
            </h2>
            <p className="text-muted text-sm mt-2">{subtitle}</p>
          </div>

          <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-[0_8px_40px_rgba(26,18,8,0.06)]">
            {children}
          </div>

          {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
