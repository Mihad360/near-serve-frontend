/* eslint-disable react/no-unescaped-entities */
// components/TrustFeatures.jsx
"use client";

export default function TrustFeatures() {
  const features = [
    {
      icon: "🔒",
      title: "Escrow Protection",
      desc: "Money is held securely until you confirm the work is done. You never pay upfront.",
    },
    {
      icon: "✅",
      title: "Admin-Verified Providers",
      desc: "Every provider is manually reviewed by our admin team — not just email verified.",
    },
    {
      icon: "🤖",
      title: "AI Trust Score",
      desc: "Our algorithm analyzes real completion data to give you an honest trust score, not fake stars.",
    },
    {
      icon: "🛡️",
      title: "24/7 Support & Disputes",
      desc: "Our team is always ready to help. Disputes are resolved fairly with full transparency.",
    },
  ];

  return (
    <section className="py-20 px-12 max-w-360 mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-[#1a1208]">
          Built for Trust — Every Step Secured
        </h2>
        <p className="text-lg text-[#6b5244] mt-3">
          We don't just say we're safe — we built safety into every part of the
          platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 flex items-start gap-4 border border-[#e8ddd0] shadow-[0_4px_16px_rgba(26,18,8,0.04)] hover:shadow-[0_8px_24px_rgba(26,18,8,0.08)] transition-all duration-300"
          >
            <div className="text-3xl shrink-0">{feat.icon}</div>
            <div>
              <h3 className="font-fraunces text-xl font-semibold text-[#1a1208] mb-1">
                {feat.title}
              </h3>
              <p className="text-[#6b5244] leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-[#6b5244]">
        <span className="inline-flex items-center gap-2 bg-white border border-[#e8ddd0] rounded-full px-4 py-2">
          💰 No hidden fees · 📱 Live tracking · 🏷️ Transparent pricing
        </span>
      </div>
    </section>
  );
}
