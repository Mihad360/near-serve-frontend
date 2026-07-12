/* eslint-disable react/no-unescaped-entities */
// components/Testimonials.jsx
"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ahmed K.",
      location: "Dhaka",
      text: "Found a plumber in 5 minutes. He fixed my sink the same day. The escrow gave me peace of mind.",
      rating: 5,
    },
    {
      name: "Nadia I.",
      location: "Mirpur",
      text: "The AI got exactly what I needed. I didn't have to scroll through hundreds of profiles. Trust score was accurate.",
      rating: 4.9,
    },
    {
      name: "Rina A.",
      location: "Gulshan",
      text: "My money was safe the whole time. The provider completed the job perfectly and I released payment instantly.",
      rating: 4.8,
    },
  ];

  return (
    <section className="py-20 px-12 max-w-360 mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-[#1a1208]">
          What People Are Saying
        </h2>
        <p className="text-lg text-[#6b5244] mt-3">
          Real stories from real users
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 border border-[#e8ddd0] shadow-[0_8px_32px_rgba(26,18,8,0.06)]"
          >
            <div className="flex items-center gap-1 text-yellow-500 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j}>{j < Math.floor(t.rating) ? "★" : "☆"}</span>
              ))}
              <span className="text-[#6b5244] text-sm ml-2">{t.rating}</span>
            </div>
            <p className="text-[#1a1208] leading-relaxed mb-4">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C70A24] flex items-center justify-center text-white font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-[#1a1208]">{t.name}</div>
                <div className="text-sm text-[#6b5244]">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 bg-[#1a1208] text-white rounded-full px-6 py-3 font-semibold">
          ★★★★★ 4.9 average rating from 4,800+ completed jobs
        </div>
      </div>
    </section>
  );
}
