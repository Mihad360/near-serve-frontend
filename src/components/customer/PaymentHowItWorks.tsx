"use client";

const STEPS = [
  {
    title: "Choose a provider",
    body: "Pick the best offer from the bid list.",
  },
  {
    title: "Pay to confirm",
    body: "Your card is charged through Stripe. NearServe holds the money.",
  },
  {
    title: "Job gets done",
    body: "Chat with your provider and track the work.",
  },
  {
    title: "Approve & release",
    body: "When you’re happy, release payment — the provider gets paid.",
  },
];

export default function PaymentHowItWorks({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-border bg-white/70 p-4"
          : "app-surface rounded-2xl p-5 md:p-6"
      }
    >
      <h2 className="font-fraunces text-lg font-semibold text-ink mb-1">
        How payment works
      </h2>
      <p className="text-sm text-muted mb-4">
        Simple and safe — you only release money when the job is done right.
      </p>
      <ol className="space-y-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3">
            <span className="size-7 shrink-0 rounded-full bg-brand/10 text-brand text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{step.title}</p>
              <p className="text-xs text-muted leading-relaxed">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
