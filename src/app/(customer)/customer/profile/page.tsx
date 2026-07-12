"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { CUSTOMER_PROFILE } from "@/data/customerMock";
import PageHeader from "@/components/shared/app/PageHeader";
import Avatar from "@/components/shared/app/Avatar";

export default function ProfilePage() {
  const [name, setName] = useState(CUSTOMER_PROFILE.name);
  const [email, setEmail] = useState(CUSTOMER_PROFILE.email);
  const [phone, setPhone] = useState(CUSTOMER_PROFILE.phone);
  const [address, setAddress] = useState(CUSTOMER_PROFILE.address);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-xl">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description={`Member since ${new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
        }).format(new Date(CUSTOMER_PROFILE.memberSince))} · ${CUSTOMER_PROFILE.jobsPosted} jobs posted`}
      />

      <div className="flex items-center gap-4 mb-8 animate-fade-up hero-delay-1">
        <Avatar name={name} size="xl" />
        <div>
          <p className="font-semibold text-ink text-lg">{name}</p>
          <p className="text-sm text-muted">
            Avg rating given · {CUSTOMER_PROFILE.avgRatingGiven}★
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="app-surface rounded-2xl p-5 md:p-7 space-y-5 animate-fade-up hero-delay-2"
      >
        <label className="block">
          <span className="block text-sm font-medium text-ink mb-1.5">
            Full name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-ink mb-1.5">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <span className="block text-sm font-medium text-ink mb-1.5">
            Default address
          </span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="app-btn rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 text-sm shadow-[0_6px_20px_rgba(199,10,36,0.22)]"
          >
            Save changes
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
