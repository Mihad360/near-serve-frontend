"use client";

import { useState, type FormEvent } from "react";
import { Check, ShieldCheck, User, Mail, Phone, MapPin, Sparkles, Lock, Star } from "lucide-react";
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
    <div className="space-y-6 w-full">
      <PageHeader
        eyebrow="Account Details"
        title="Profile & settings"
        description="Manage your contact details, service address, and security preferences."
      />

      <div className="grid lg:grid-cols-12 gap-6 items-start animate-fade-up">
        {/* Left Column: Profile Card & Trust Stats (5/12) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-stone-100 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-xs">
            <Avatar name={name} size="xl" />
            <h2 className="font-fraunces text-2xl font-bold text-ink mt-4">{name}</h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Customer Account
            </span>
            <p className="text-xs text-muted font-medium mt-3">
              Member since {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(new Date(CUSTOMER_PROFILE.memberSince))}
            </p>

            <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-6 border-t border-stone-200/70">
              <div className="bg-white rounded-2xl p-3 shadow-xs">
                <div className="text-xs font-bold text-muted uppercase">Jobs Posted</div>
                <div className="font-fraunces text-xl font-bold text-ink mt-0.5">
                  {CUSTOMER_PROFILE.jobsPosted}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-3 shadow-xs">
                <div className="text-xs font-bold text-muted uppercase">Avg Rating</div>
                <div className="font-fraunces text-xl font-bold text-amber-600 mt-0.5">
                  ⭐ {CUSTOMER_PROFILE.avgRatingGiven}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-100 rounded-3xl p-5 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white text-brand flex items-center justify-center shrink-0 shadow-xs">
              <Lock className="size-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-ink uppercase tracking-wider">
                Privacy Protected
              </div>
              <p className="text-xs text-muted leading-relaxed mt-0.5">
                Your full phone number and address are only shared with the specific provider you hire for a confirmed job.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form (7/12) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-stone-100 rounded-3xl p-6 md:p-8 space-y-5 shadow-xs"
          >
            <h3 className="font-fraunces text-xl font-bold text-ink border-b border-stone-200/70 pb-3">
              Personal Information
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

            <div>
              <label className="block text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
                <Mail className="size-4 text-muted" />
                Email Address
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
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-medium shadow-xs"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
                <MapPin className="size-4 text-muted" />
                Default Service Address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-2xl bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-medium shadow-xs"
              />
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
                  Settings updated successfully
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
