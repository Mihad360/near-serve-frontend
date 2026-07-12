// components/HowItWorks.jsx
"use client";

export default function HowItWorks() {
  const steps = [
    {
      icon: "📝",
      title: "Describe Your Job",
      desc: "Tell us what you need in plain words. No forms, no dropdowns — just talk.",
    },
    {
      icon: "🤖",
      title: "AI Matches & Providers Bid",
      desc: "Our AI finds verified local providers who compete for your job with their best offer.",
    },
    {
      icon: "✅",
      title: "You Pick & Relax",
      desc: "Choose the best bid. Money stays in escrow until you're 100% satisfied.",
    },
  ];

  return (
    <section className="py-20 px-12 max-w-360 mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-[#1a1208]">
          How It Works — In 3 Simple Steps
        </h2>
        <p className="text-lg text-[#6b5244] mt-3 max-w-2xl mx-auto">
          Takes 2 minutes. No searching. No guessing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(26,18,8,0.06)] border border-[#e8ddd0] hover:shadow-[0_12px_48px_rgba(26,18,8,0.12)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="font-fraunces text-2xl font-semibold text-[#1a1208] mb-2">
              {step.title}
            </h3>
            <p className="text-[#6b5244] leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
