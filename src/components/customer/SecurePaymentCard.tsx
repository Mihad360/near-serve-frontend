"use client";

import { CreditCard, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/customer/format";
import { cn } from "@/lib/utils";

type SecurePaymentCardProps = {
  amount: number;
  paid: boolean;
  hasChosenProvider: boolean;
  providerFirstName?: string;
  onPay: () => void;
  className?: string;
};

/**
 * Plain-language payment hold (Stripe PaymentIntent → capture on approve).
 * Avoids "escrow" jargon.
 */
export default function SecurePaymentCard({
  amount,
  paid,
  hasChosenProvider,
  providerFirstName,
  onPay,
  className,
}: SecurePaymentCardProps) {
  return (
    <div
      className={cn(
        "bg-ink text-white rounded-2xl p-5 md:p-6 relative overflow-hidden shadow-[0_12px_40px_rgba(26,18,8,0.18)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.35)_0%,transparent_55%)]" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="size-5 text-brand" />
          <h2 className="font-fraunces text-lg font-semibold">
            Secure payment
          </h2>
        </div>

        {paid ? (
          <>
            <p className="font-fraunces text-3xl font-bold mb-1 tabular-nums">
              {formatCurrency(amount)}
            </p>
            <p className="text-sm text-white/65 mb-4 leading-relaxed">
              Your card was charged. Money is held safely until you approve the
              finished work
              {providerFirstName ? ` — then ${providerFirstName} gets paid` : ""}.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f5e9] text-[#1b5e20] text-xs font-semibold px-3 py-1.5">
              <CheckCircle2 className="size-3.5" />
              Payment held safely
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              {hasChosenProvider
                ? "Pay now to confirm the booking. NearServe holds the money until the job is done and you say it’s good."
                : "Choose a provider first. Then pay here to lock in the booking."}
            </p>
            <button
              type="button"
              onClick={onPay}
              disabled={!hasChosenProvider}
              className="app-btn w-full flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold py-3.5 disabled:opacity-40"
            >
              <CreditCard className="size-4" />
              Pay {formatCurrency(amount)} to confirm
              <ArrowRight className="size-4" />
            </button>
            <p className="mt-3 text-[11px] text-white/40 leading-relaxed">
              Powered by Stripe · Card is charged when you confirm · Provider is
              paid only after you approve
            </p>
          </>
        )}
      </div>
    </div>
  );
}
