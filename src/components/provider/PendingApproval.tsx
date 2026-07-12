import Link from "next/link";
import { Clock, ShieldAlert, Sparkles } from "lucide-react";
import { ROUTES } from "@/utils/navigation";

type PendingApprovalProps = {
  compact?: boolean;
};

export default function PendingApproval({ compact }: PendingApprovalProps) {
  return (
    <div
      className={
        compact
          ? "relative overflow-hidden rounded-3xl border border-border app-surface p-6"
          : "relative max-w-lg mx-auto text-center py-10 md:py-16 animate-fade-up"
      }
    >
      {!compact && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 rounded-3xl opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(255,243,224,0.9), transparent 60%), radial-gradient(circle at 80% 80%, rgba(199,10,36,0.05), transparent 40%)",
          }}
        />
      )}
      <div
        className={
          compact
            ? "relative z-10 flex flex-col sm:flex-row gap-5 items-start"
            : "relative z-10 flex flex-col items-center"
        }
      >
        <div className="relative mx-auto sm:mx-0 mb-0 flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#fff3e0] text-[#9a5b00] border border-[#f0d9a8]/80 shadow-[0_8px_24px_rgba(154,91,0,0.12)]">
          <span
            aria-hidden
            className="absolute inset-0 rounded-2xl animate-pulse-ring bg-[#f0d9a8]/40"
          />
          <Clock className="relative size-7" />
        </div>
        <div className={compact ? "text-left flex-1" : ""}>
          <p className="text-xs uppercase tracking-[0.16em] text-muted font-medium mb-2 inline-flex items-center gap-1.5">
            <Sparkles className="size-3 text-brand" />
            Account review
          </p>
          <h1
            className={
              compact
                ? "font-fraunces text-2xl font-semibold text-ink mb-2"
                : "font-fraunces text-3xl md:text-4xl font-semibold text-ink mb-3"
            }
          >
            Pending approval
          </h1>
          <p className="text-muted text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto sm:mx-0">
            Your provider profile is under review. You&apos;ll unlock the nearby
            job feed and bidding once NearServe approves your account — usually
            within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <Link
              href={`${ROUTES.PROVIDER_ONBOARDING}?pending=1`}
              className="app-btn inline-flex items-center justify-center rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-3 shadow-[0_6px_20px_rgba(199,10,36,0.22)]"
            >
              View onboarding status
            </Link>
            <Link
              href={ROUTES.PROVIDER_PROFILE}
              className="app-btn inline-flex items-center justify-center rounded-xl border border-border bg-white/90 text-ink text-sm font-semibold px-5 py-3 hover:border-border-warm"
            >
              Edit profile
            </Link>
          </div>
          <p className="mt-6 inline-flex items-start gap-2 text-xs text-muted bg-white/70 rounded-xl px-3 py-2.5 border border-border text-left shadow-sm">
            <ShieldAlert className="size-3.5 shrink-0 mt-0.5 text-brand" />
            Preview tip: remove <code className="font-mono text-ink">?pending=1</code>{" "}
            from the URL to see the approved feed.
          </p>
        </div>
      </div>
    </div>
  );
}
