"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Star, ShieldCheck, User, Mail, Phone, MapPin, Landmark, Award } from "lucide-react";
import { PROVIDER_PROFILE, JOB_CATEGORIES } from "@/data/providerMock";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";
import Avatar from "@/components/shared/app/Avatar";
import { ROUTES } from "@/utils/navigation";

export default function ProviderProfilePage() {
  const [name, setName] = useState(PROVIDER_PROFILE.name);
  const [email, setEmail] = useState(PROVIDER_PROFILE.email);
  const [phone, setPhone] = useState(PROVIDER_PROFILE.phone);
  const [bio, setBio] = useState(PROVIDER_PROFILE.bio);
  const [address, setAddress] = useState(PROVIDER_PROFILE.address);
  const [radius, setRadius] = useState(
    String(PROVIDER_PROFILE.serviceRadiusKm),
  );
  const payout = PROVIDER_PROFILE.payoutMethod;
  const [categories, setCategories] = useState<string[]>(
    PROVIDER_PROFILE.categories,
  );
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
    <div className="space-y-6 w-full">
      <PageHeader
        eyebrow="Provider Account"
        title="Profile & skills"
        description="Manage your professional bio, service radius, trade categories, and payout settings."
      />

      <div className="grid lg:grid-cols-12 gap-6 items-start animate-fade-up">
        {/* Left Column: Pro Badge & Payout Summary (5/12) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-stone-100 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-xs">
            <Avatar name={name} size="xl" />
            <h2 className="font-fraunces text-2xl font-bold text-ink mt-4">{name}</h2>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Specialist
              </span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {PROVIDER_PROFILE.rating} Rating
              </span>
            </div>

            <p className="text-xs text-muted font-medium mt-3">
              Member since {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(new Date(PROVIDER_PROFILE.memberSince))}
            </p>

            <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-6 border-t border-stone-200/70">
              <div className="bg-white rounded-2xl p-3 shadow-xs">
                <div className="text-xs font-bold text-muted uppercase">Jobs Done</div>
                <div className="font-fraunces text-xl font-bold text-ink mt-0.5">
                  {PROVIDER_PROFILE.jobsCompleted}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-3 shadow-xs">
                <div className="text-xs font-bold text-muted uppercase">Radius</div>
                <div className="font-fraunces text-xl font-bold text-brand mt-0.5">
                  {radius} km
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-100 rounded-3xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider">
              <Landmark className="size-4 text-brand" />
              <span>Automated Direct Payouts</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Payout Destination: <strong className="text-ink">{payout || "Bank Direct Deposit"}</strong>. Money transfers automatically when customers approve completed work.
            </p>
            <Link
              href={ROUTES.PROVIDER_PAYOUTS}
              className="inline-block text-xs font-bold text-brand hover:underline"
            >
              Configure Bank Payouts →
            </Link>
          </div>
        </div>

        {/* Right Column: Edit Profile Form (7/12) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-stone-100 rounded-3xl p-6 md:p-8 space-y-5 shadow-xs"
          >
            <h3 className="font-fraunces text-xl font-bold text-ink border-b border-stone-200/70 pb-3">
              Specialist Profile
            </h3>

            <div>
              <label className="block text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
                <User className="size-4 text-muted" />
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-medium shadow-xs"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
                  <Mail className="size-4 text-muted" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-medium shadow-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
                  <Phone className="size-4 text-muted" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-medium shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-1.5">
                Professional Bio &amp; Experience
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-2xl bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-medium resize-none shadow-xs"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
                  <MapPin className="size-4 text-muted" />
                  Base Location
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-2xl bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-medium shadow-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-1.5">
                  Service Radius (km)
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full rounded-2xl bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-medium shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-2">
                Trade Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {JOB_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCategory(c)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200",
                      categories.includes(c)
                        ? "bg-brand text-white shadow-xs"
                        : "bg-white text-warm hover:bg-stone-200/80",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="rounded-2xl bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3.5 text-sm shadow-md shadow-brand/25 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Save Changes
              </button>
              {saved && (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full animate-fade-in">
                  <Check className="size-4" />
                  Profile updated successfully
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
