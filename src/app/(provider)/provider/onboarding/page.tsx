"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Clock, ShieldCheck, Sparkles } from "lucide-react";
import {
  getProviderProfile,
  isProviderApproved,
  JOB_CATEGORIES,
} from "@/data/providerMock";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const pendingQ = searchParams.get("pending");
  const approved = isProviderApproved(pendingQ);
  const profile = getProviderProfile(pendingQ);

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [bio, setBio] = useState(profile.bio);
  const [radius, setRadius] = useState(String(profile.serviceRadiusKm));
  const [categories, setCategories] = useState<string[]>(profile.categories);
  const [saved, setSaved] = useState(false);

  function toggleCategory(c: string) {
    setCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Get set up"
        title="Provider onboarding"
        description="Tell customers what you do. Approval unlocks the job feed and bidding."
      />

      {!approved ? (
        <div className="mb-8 rounded-2xl border border-[#f0d9a8] bg-[linear-gradient(135deg,#fff8eb_0%,#fff3e0_100%)] p-5 flex gap-4 animate-fade-up hero-delay-1 shadow-[0_8px_28px_rgba(154,91,0,0.08)]">
          <div className="relative size-11 rounded-2xl bg-white/80 text-[#9a5b00] flex items-center justify-center shrink-0 border border-[#f0d9a8]/60">
            <span aria-hidden className="absolute inset-0 rounded-2xl animate-pulse-ring bg-[#f0d9a8]/40" />
            <Clock className="relative size-5" />
          </div>
          <div>
            <h2 className="font-fraunces text-lg font-semibold text-ink">
              Pending approval
            </h2>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              We&apos;re reviewing your profile. You can still edit details below.
              Bidding stays locked until you&apos;re approved.
            </p>
            <Link
              href={`${ROUTES.PROVIDER_HOME}?pending=1`}
              className="inline-block mt-3 text-sm font-semibold text-brand hover:underline"
            >
              Preview blocked feed →
            </Link>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-2xl border border-[#c8e6c9] bg-[linear-gradient(135deg,#e8f5e9_0%,#f1f8f2_100%)] p-5 flex gap-4 animate-fade-up hero-delay-1">
          <div className="size-11 rounded-2xl bg-white text-[#1b5e20] flex items-center justify-center shrink-0 border border-[#c8e6c9]/80 shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h2 className="font-fraunces text-lg font-semibold text-ink inline-flex items-center gap-2">
              You&apos;re approved
              <Sparkles className="size-4 text-brand" />
            </h2>
            <p className="text-sm text-muted mt-1">
              Your account can bid on nearby jobs.{" "}
              <Link
                href={`${ROUTES.PROVIDER_ONBOARDING}?pending=1`}
                className="font-semibold text-brand hover:underline"
              >
                Preview pending state
              </Link>
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="app-surface rounded-2xl p-5 md:p-7 space-y-5 animate-fade-up hero-delay-2"
      >
        <label className="block">
          <span className="block text-sm font-medium text-ink mb-1.5">
            Display name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-ink mb-1.5">
            Phone
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-ink mb-1.5">Bio</span>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-ink mb-1.5">
            Service radius (km)
          </span>
          <input
            type="number"
            min={1}
            max={50}
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-ink mb-2">
            Categories
          </legend>
          <div className="flex flex-wrap gap-2">
            {JOB_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className={cn(
                  "app-chip rounded-full px-3.5 py-1.5 text-sm font-medium border",
                  categories.includes(c)
                    ? "bg-ink text-cream border-ink shadow-sm"
                    : "bg-cream text-warm border-border hover:border-border-warm",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="app-btn rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 text-sm shadow-[0_6px_20px_rgba(199,10,36,0.22)]"
          >
            Save profile
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-[#1b5e20] animate-fade-in">
              <Check className="size-4" />
              Saved (preview only)
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default function ProviderOnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse h-40 rounded-2xl bg-white/50 border border-border" />
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
