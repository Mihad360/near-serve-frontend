"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, MapPin, Check, Sparkles } from "lucide-react";
import { JOB_CATEGORIES } from "@/data/customerMock";
import JobMap from "@/components/customer/JobMap";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";

const DEFAULT_LOC = {
  address: "284 Valencia St, San Francisco, CA",
  lat: 37.7649,
  lng: -122.4214,
};

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<(typeof JOB_CATEGORIES)[number]>(
    "Plumbing",
  );
  const [budget, setBudget] = useState("");
  const [address, setAddress] = useState(DEFAULT_LOC.address);
  const [submitted, setSubmitted] = useState(false);
  const [photoSlots] = useState([0, 1, 2]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto py-12 animate-fade-up">
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#e8f5e9] text-[#1b5e20] border border-[#c8e6c9]/60 shadow-[0_8px_28px_rgba(27,94,32,0.12)]">
            <span aria-hidden className="absolute inset-0 rounded-2xl animate-pulse-ring bg-[#c8e6c9]/50" />
            <Check className="relative size-8" />
          </div>
          <h1 className="font-fraunces text-3xl font-semibold text-ink mb-3">
            Job posted
          </h1>
          <p className="text-muted leading-relaxed">
            Nearby providers can now bid. You&apos;ll pick a winner, then pay to
            confirm before work starts.
          </p>
        </div>

        <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand/[0.04] p-5 mb-6 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">
            What&apos;s next
          </p>
          <ol className="space-y-2.5 text-sm text-ink">
            <li className="flex gap-2">
              <span className="font-semibold text-brand">1.</span>
              Wait for offers on your job
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-brand">2.</span>
              Choose the best provider
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-brand">3.</span>
              Pay to confirm → chat opens → work begins
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={ROUTES.CUSTOMER_HOME}
            className="app-btn rounded-xl bg-brand text-white font-semibold px-5 py-3 text-sm shadow-[0_6px_20px_rgba(199,10,36,0.22)] text-center"
          >
            Back to my jobs
          </Link>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="app-btn rounded-xl border border-border bg-white text-ink font-semibold px-5 py-3 text-sm"
          >
            Post another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={ROUTES.CUSTOMER_HOME}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-6 transition-colors"
      >
        <ArrowLeft className="size-4" />
        My jobs
      </Link>

      <div className="mb-8 animate-fade-up">
        <p className="text-xs uppercase tracking-[0.16em] text-muted font-medium mb-2 inline-flex items-center gap-1.5">
          <Sparkles className="size-3 text-brand" />
          New request
        </p>
        <h1 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink tracking-tight">
          Post a job
        </h1>
        <p className="mt-2 text-muted text-sm md:text-base leading-relaxed">
          Describe what you need. Local providers will compete with bids.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up hero-delay-1">
        <div className="app-surface rounded-2xl p-5 md:p-7 space-y-5">
          <Field label="Title">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fix leaking kitchen sink"
              className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-shadow"
            />
          </Field>

          <Field label="Description">
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs doing? Any access notes, timing, or materials?"
              className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-y transition-shadow"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Category">
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as (typeof JOB_CATEGORIES)[number])
                }
                className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              >
                {JOB_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Budget (USD)">
              <input
                required
                type="number"
                min={1}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="200"
                className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </Field>
          </div>

          <Field label="Photos">
            <div className="grid grid-cols-3 gap-3">
              {photoSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className="aspect-square rounded-xl border border-dashed border-border-warm bg-cream/40 flex flex-col items-center justify-center gap-2 text-muted hover:border-brand/40 hover:text-brand hover:bg-white/60 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Camera className="size-5" />
                  <span className="text-[11px] font-medium">Add photo</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">
              Placeholders only — uploads aren&apos;t wired yet.
            </p>
          </Field>
        </div>

        <div className="app-surface rounded-2xl p-5 md:p-7 space-y-4">
          <Field label="Job location">
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brand" />
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-border bg-cream/50 pl-10 pr-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
          </Field>
          <JobMap
            lat={DEFAULT_LOC.lat}
            lng={DEFAULT_LOC.lng}
            label={address}
            className="h-[260px]"
          />
          <p className="text-xs text-muted">
            Map pin uses mock coordinates for design review.
          </p>
        </div>

        <button
          type="submit"
          className={cn(
            "app-btn w-full sm:w-auto rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 text-sm shadow-[0_6px_20px_rgba(199,10,36,0.22)]",
          )}
        >
          Post job
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink mb-1.5">{label}</span>
      {children}
    </label>
  );
}
