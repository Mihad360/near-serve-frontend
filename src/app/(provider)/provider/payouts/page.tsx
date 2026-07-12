"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Check,
  ExternalLink,
  Landmark,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import {
  getStripeAccountStatus,
  type MockStripePreset,
} from "@/data/providerMock";
import type { StripeAccountStatus } from "@/types/job";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";

/**
 * Stripe Express Connect setup — mirrors provider APIs:
 * POST /provider/stripe/create-account
 * GET  /provider/stripe/onboarding-link
 * GET  /provider/stripe/account-status
 * GET  /provider/stripe/dashboard-link
 */
function PayoutsContent() {
  const searchParams = useSearchParams();
  const initial = getStripeAccountStatus(searchParams.get("stripe"));
  const [status, setStatus] = useState<StripeAccountStatus>(initial);
  const [busy, setBusy] = useState(false);

  const ready = status.chargesEnabled && status.payoutsEnabled;

  const createAccount = () => {
    setBusy(true);
    window.setTimeout(() => {
      setStatus({
        hasAccount: true,
        detailsSubmitted: false,
        chargesEnabled: false,
        payoutsEnabled: false,
      });
      setBusy(false);
      toast.success("Stripe account created", {
        description: "Next: finish bank details with Stripe.",
      });
    }, 700);
  };

  const openOnboarding = () => {
    toast.message("Stripe onboarding (preview)", {
      description:
        "Live app opens Stripe Express hosted onboarding. Complete ID + bank there.",
    });
    setBusy(true);
    window.setTimeout(() => {
      setStatus({
        hasAccount: true,
        detailsSubmitted: true,
        chargesEnabled: true,
        payoutsEnabled: true,
        bankLast4: "8821",
      });
      setBusy(false);
      toast.success("Payouts ready", {
        description: "You can receive money when customers approve jobs.",
      });
    }, 900);
  };

  const openDashboard = () => {
    toast.message("Stripe Express dashboard (preview)", {
      description: "Live app opens your Stripe Express login link.",
    });
  };

  const previewPreset = (preset: MockStripePreset) => {
    const map = {
      none: getStripeAccountStatus("none"),
      pending: getStripeAccountStatus("pending"),
      ready: getStripeAccountStatus("ready"),
    };
    setStatus(map[preset]);
  };

  const steps = [
    {
      done: status.hasAccount,
      title: "Create Stripe account",
      body: "One click — NearServe creates your Stripe Express account.",
    },
    {
      done: status.detailsSubmitted,
      title: "Add bank details",
      body: "Stripe asks for ID and where to send money. Takes a few minutes.",
    },
    {
      done: ready,
      title: "Start getting paid",
      body: "When a customer approves a job, money goes to your bank.",
    },
  ];

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Get paid"
        title="Payout setup"
        description="Connect a Stripe Express account so customers’ payments can reach your bank after they approve the work."
      />

      {/* Design preview toggles */}
      <div className="mb-6 flex flex-wrap gap-2 text-xs animate-fade-up">
        <span className="text-muted self-center mr-1">Preview as:</span>
        {(
          [
            ["none", "Not started"],
            ["pending", "Needs bank details"],
            ["ready", "Ready"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => previewPreset(key)}
            className="rounded-full border border-border bg-white px-3 py-1 font-medium text-warm hover:border-brand hover:text-brand"
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "mb-6 rounded-2xl p-5 flex gap-4 animate-fade-up",
          ready
            ? "border border-[#c8e6c9] bg-[linear-gradient(135deg,#e8f5e9_0%,#f1f8f2_100%)]"
            : "border border-[#f0d9a8] bg-[linear-gradient(135deg,#fff8eb_0%,#fff3e0_100%)]",
        )}
      >
        <div
          className={cn(
            "size-11 rounded-2xl flex items-center justify-center shrink-0 border",
            ready
              ? "bg-white text-[#1b5e20] border-[#c8e6c9]/80"
              : "bg-white/80 text-[#9a5b00] border-[#f0d9a8]/60",
          )}
        >
          {ready ? (
            <ShieldCheck className="size-5" />
          ) : (
            <Landmark className="size-5" />
          )}
        </div>
        <div>
          <h2 className="font-fraunces text-lg font-semibold text-ink">
            {ready
              ? "Payouts are ready"
              : status.hasAccount
                ? "Finish setup on Stripe"
                : "Set up how you get paid"}
          </h2>
          <p className="text-sm text-muted mt-1 leading-relaxed">
            {ready
              ? `Money from approved jobs goes to bank ···· ${status.bankLast4 ?? "····"}.`
              : "You need a Stripe Express account before earnings can leave NearServe."}
          </p>
        </div>
      </div>

      <ol className="space-y-3 mb-8 animate-fade-up hero-delay-1">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="app-surface rounded-2xl p-4 flex gap-3 items-start"
          >
            <span
              className={cn(
                "size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border-2",
                step.done
                  ? "bg-brand border-brand text-white"
                  : "bg-cream border-border text-muted",
              )}
            >
              {step.done ? <Check className="size-3.5" /> : i + 1}
            </span>
            <div>
              <p className="font-semibold text-ink text-sm">{step.title}</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="app-surface rounded-2xl p-5 space-y-3 animate-fade-up hero-delay-2">
        <h3 className="font-fraunces text-base font-semibold text-ink mb-1">
          Actions
        </h3>

        {!status.hasAccount && (
          <button
            type="button"
            disabled={busy}
            onClick={createAccount}
            className="app-btn w-full flex items-center justify-center gap-2 rounded-xl bg-brand text-white font-semibold py-3.5 text-sm hover:bg-brand-dark disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Building2 className="size-4" />
            )}
            Create Stripe account
          </button>
        )}

        {status.hasAccount && !ready && (
          <button
            type="button"
            disabled={busy}
            onClick={openOnboarding}
            className="app-btn w-full flex items-center justify-center gap-2 rounded-xl bg-brand text-white font-semibold py-3.5 text-sm hover:bg-brand-dark disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ExternalLink className="size-4" />
            )}
            Continue on Stripe
          </button>
        )}

        {ready && (
          <button
            type="button"
            onClick={openDashboard}
            className="app-btn w-full flex items-center justify-center gap-2 rounded-xl bg-ink text-white font-semibold py-3.5 text-sm hover:bg-ink/90"
          >
            <ExternalLink className="size-4" />
            Open Stripe dashboard
          </button>
        )}

        <div className="pt-3 border-t border-border grid sm:grid-cols-3 gap-2 text-xs">
          <StatusPill
            label="Account"
            ok={status.hasAccount}
            yes="Created"
            no="Not created"
          />
          <StatusPill
            label="Details"
            ok={status.detailsSubmitted}
            yes="Submitted"
            no="Incomplete"
          />
          <StatusPill
            label="Payouts"
            ok={status.payoutsEnabled}
            yes="Enabled"
            no="Disabled"
          />
        </div>
      </div>

      <p className="mt-6 text-xs text-muted leading-relaxed">
        APIs used here:{" "}
        <code className="text-[11px]">create-account</code>,{" "}
        <code className="text-[11px]">onboarding-link</code>,{" "}
        <code className="text-[11px]">account-status</code>,{" "}
        <code className="text-[11px]">dashboard-link</code>.{" "}
        <Link href={ROUTES.PROVIDER_EARNINGS} className="text-brand font-medium">
          View earnings →
        </Link>
      </p>
    </div>
  );
}

function StatusPill({
  label,
  ok,
  yes,
  no,
}: {
  label: string;
  ok: boolean;
  yes: string;
  no: string;
}) {
  return (
    <div className="rounded-xl bg-cream/80 border border-border px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted mb-0.5">
        {label}
      </p>
      <p className={cn("font-semibold", ok ? "text-[#1b5e20]" : "text-[#9a5b00]")}>
        {ok ? yes : no}
      </p>
    </div>
  );
}

export default function ProviderPayoutsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-muted">Loading…</div>
      }
    >
      <PayoutsContent />
    </Suspense>
  );
}
