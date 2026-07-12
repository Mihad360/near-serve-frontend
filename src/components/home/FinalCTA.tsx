// components/FinalCTA.jsx
"use client";

import { useState } from "react";

export default function FinalCTA() {
  const [jobDesc, setJobDesc] = useState("");

  const handlePost = () => {
    if (jobDesc.trim()) {
      // Redirect to post job or open modal
      alert("Post job: " + jobDesc);
    }
  };

  return (
    <section className="py-20 px-12 max-w-360 mx-auto">
      <div className="bg-[#1a1208] rounded-3xl p-12 text-center text-white relative overflow-hidden">
        {/* subtle glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,10,36,0.15)_0%,transparent_70%)] pointer-events-none"></div>

        <h2 className="font-fraunces text-4xl md:text-5xl font-semibold relative z-10">
          Ready to Get It Done?
        </h2>
        <p className="text-lg text-[#FAF6EF] opacity-80 mt-3 max-w-xl mx-auto relative z-10">
          Post a job and let verified providers compete for it. No credit card
          required.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <input
            type="text"
            placeholder="What do you need done? e.g. fix my AC..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            className="w-full sm:w-96 px-6 py-4 rounded-full border-2 border-[#C70A24] bg-white/10 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#C70A24]"
          />
          <button
            onClick={handlePost}
            className="bg-[#C70A24] hover:bg-[#a50820] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 flex items-center gap-2"
          >
            Post Job — Free →
          </button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/70 relative z-10">
          <span>✅ No credit card required</span>
          <span>✅ Free to post</span>
          <span>✅ Money backed by escrow</span>
        </div>
      </div>
    </section>
  );
}
