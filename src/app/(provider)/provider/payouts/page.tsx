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
  ArrowRight,
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
      toast.success("Payout account linked", {
        description: "Please complete your bank account details.",
      });
    }, 700);
  };

  const openOnboarding = () => {
    toast.message("Payout onboarding (preview)", {
      description:
        "Opens secure verification to confirm your identity and bank payout info.",
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
      toast.success("Payouts Enabled!", {
        description: "Direct payouts are now active for completed jobs.",
      });
    }, 900);
  };

  const openDashboard = () => {
    toast.message("Payout dashboard link opened");
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
      title: "1. Create Payout Account",
      body: "Connect your bank or digital wallet to NearServe.",
    },
    {
      done: status.detailsSubmitted,
      title: "2. Verify Bank Details",
      body: "Submit routing details and government ID for quick verification.",
    },
    {
      done: ready,
      title: "3. Receive Instant Payouts",
      body: "Earnings deposit directly as soon as customers sign off on finished work.",
    },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader
        eyebrow="Payout Settings"
        title="Direct deposit & bank setup"
        description="Connect your account to receive automated payouts directly upon job completion."
      />

      {/* Preset switcher for demo */}
      <div className="flex flex-wrap items-center gap-2 text-xs animate-fade-up">
        <span className="text-muted font-bold mr-1">Preview state:</span>
        {(
          [
            ["none", "Not started"],
            ["pending", "Needs bank details"],
            ["ready", "Verified & Ready"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => previewPreset(key)}
            className="rounded-full bg-stone-100 hover:bg-stone-200 px-3 py-1 font-bold text-ink transition-all shadow-xs"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Status Banner */}
      <div
        className={cn(
          "rounded-3xl p-6 flex gap-4 animate-fade-up shadow-xs",
          ready
            ? "bg-emerald-50 border border-emerald-200/80"
            : "bg-amber-50 border border-amber-200/80",
        )}
      >
        <div
          className={cn(
            "size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs",
            ready
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-100 text-amber-800",
          )}
        >
          {ready ? (
            <ShieldCheck className="size-6" />
          ) : (
            <Landmark className="size-6" />
          )}
        </div>
        <div>
          <h2 className="font-fraunces text-xl font-bold text-ink">
            {ready
              ? "Payouts are Fully Configured"
              : status.hasAccount
                ? "Finish Bank Account Setup"
                : "Set Up Your Direct Payouts"}
          </h2>
          <p className="text-xs text-muted mt-1 leading-relaxed font-medium">
            {ready
              ? `Funds from completed jobs deposit automatically to Bank account ending in ···· ${status.bankLast4 ?? "8821"}.`
              : "Link your payout method so you receive funds immediately upon job approval."}
          </p>
        </div>
      </div>

      {/* 3 Step List */}
      <ol className="space-y-3 animate-fade-up hero-delay-1">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="bg-stone-100 rounded-3xl p-5 flex gap-4 items-start shadow-xs"
          >
            <span
              className={cn(
                "size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                step.done
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-stone-200 text-muted",
              )}
            >
              {step.done ? <Check className="size-4" /> : i + 1}
            </span>
            <div>
              <p className="font-bold text-ink text-sm">{step.title}</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Action Card */}
      <div className="bg-stone-100 rounded-3xl p-6 md:p-7 space-y-4 animate-fade-up hero-delay-2 shadow-xs">
        <h3 className="font-fraunces text-lg font-bold text-ink">
          Payout Actions
        </h3>

        {!status.hasAccount && (
          <button
            type="button"
            disabled={busy}
            onClick={createAccount}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand text-white font-bold py-4 text-sm hover:bg-brand-dark transition-all duration-300 shadow-md shadow-brand/25 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Building2 className="size-4" />
            )}
            <span>Link Bank Account</span>
          </button>
        )}

        {status.hasAccount && !ready && (
          <button
            type="button"
            disabled={busy}
            onClick={openOnboarding}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand text-white font-bold py-4 text-sm hover:bg-brand-dark transition-all duration-300 shadow-md shadow-brand/25 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ExternalLink className="size-4" />
            )}
            <span>Complete Bank Verification</span>
          </button>
        )}

        {ready && (
          <button
            type="button"
            onClick={openDashboard}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-ink text-white font-bold py-4 text-sm hover:bg-stone-800 transition-all shadow-xs"
          >
            <ExternalLink className="size-4" />
            <span>Open Payout Dashboard</span>
          </button>
        )}

        <div className="pt-4 border-t border-stone-200/70 grid grid-cols-3 gap-2 text-xs">
          <StatusPill
            label="Account"
            ok={status.hasAccount}
            yes="Connected"
            no="Pending"
          />
          <StatusPill
            label="Bank Details"
            ok={status.detailsSubmitted}
            yes="Verified"
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
    <div className="rounded-2xl bg-white p-3 text-center shadow-xs">
      <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-0.5">
        {label}
      </p>
      <p className={cn("font-bold text-xs", ok ? "text-emerald-700" : "text-amber-700")}>
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
