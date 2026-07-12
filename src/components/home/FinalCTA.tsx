"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthCta } from "@/hooks/useAuthCta";
import { ROUTES } from "@/utils/navigation";

export default function FinalCTA() {
  const [jobDesc, setJobDesc] = useState("");
  const { primary, role } = useAuthCta();
  const router = useRouter();

  const handlePost = () => {
    if (role === "customer") {
      router.push(ROUTES.CUSTOMER_POST_JOB);
      return;
    }
    if (role === "provider") {
      router.push(ROUTES.PROVIDER_HOME);
      return;
    }
    router.push(ROUTES.REGISTER);
  };

  return (
    <section className="py-20 px-12 max-w-360 mx-auto">
      <div className="bg-[#1a1208] rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,10,36,0.15)_0%,transparent_70%)] pointer-events-none"></div>

        <h2 className="font-fraunces text-4xl md:text-5xl font-semibold relative z-10">
          Ready to Get It Done?
        </h2>
        <p className="text-lg text-[#FAF6EF] opacity-80 mt-3 max-w-xl mx-auto relative z-10">
          {role === "provider"
            ? "Browse nearby jobs and place competitive bids. Escrow pays you when the work is approved."
            : role === "customer"
              ? "Post a job and let verified providers compete. Money stays in escrow until you're happy."
              : "Create an account — then post jobs or join as a provider. Escrow keeps payments safe."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          {role !== "provider" && (
            <input
              type="text"
              placeholder="What do you need done? e.g. fix my AC..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePost()}
              className="w-full sm:w-96 px-6 py-4 rounded-full border-2 border-[#C70A24] bg-white/10 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#C70A24]"
            />
          )}
          <button
            type="button"
            onClick={handlePost}
            className="bg-[#C70A24] hover:bg-[#a50820] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 flex items-center gap-2"
          >
            {primary.label} →
          </button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/70 relative z-10">
          <span>✓ Verified local providers</span>
          <span>✓ Escrow-protected payments</span>
          <Link href={ROUTES.HOW_IT_WORKS} className="hover:text-white transition-colors">
            ✓ See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
