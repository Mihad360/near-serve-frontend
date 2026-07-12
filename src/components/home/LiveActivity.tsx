/* eslint-disable react/no-unescaped-entities */
// components/LiveActivity.jsx
"use client";

import { useEffect, useState } from "react";

export default function LiveActivity() {
  const [count, setCount] = useState(0);
  const target = 847;

  useEffect(() => {
    // Animate count on mount
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const recentJobs = [
    {
      name: "Ahmed K.",
      service: "fixed a sink",
      location: "Dhanmondi",
      rating: 5,
    },
    {
      name: "Karim M.",
      service: "installed AC",
      location: "Gulshan",
      rating: 4.9,
    },
    {
      name: "Sara R.",
      service: "painted a room",
      location: "Mirpur",
      rating: 4.8,
    },
    {
      name: "Tariq H.",
      service: "repaired a fridge",
      location: "Uttara",
      rating: 4.7,
    },
  ];

  return (
    <section className="py-20 px-12 max-w-360 mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-[#1a1208]">
          Live Near You Right Now
        </h2>
        <p className="text-lg text-[#6b5244] mt-3">
          See what's happening in real-time
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(26,18,8,0.06)] border border-[#e8ddd0]">
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-2xl font-bold text-[#1a1208] font-fraunces">
              {count}+
            </span>
            <span className="text-[#6b5244]">providers active</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-[#1a1208] font-fraunces">
              12
            </span>
            <span className="text-[#6b5244]">jobs posted today</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-[#1a1208] font-fraunces">
              4.8k
            </span>
            <span className="text-[#6b5244]">jobs completed</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#e8ddd0]">
          <p className="text-sm text-[#6b5244] font-medium uppercase tracking-wider mb-4">
            Recent Activity
          </p>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {recentJobs.map((job, i) => (
              <div
                key={i}
                className="shrink-0 bg-[#FAF6EF] rounded-2xl px-4 py-3 flex items-center gap-3 whitespace-nowrap"
              >
                <span className="text-lg">🛠️</span>
                <div>
                  <span className="font-semibold text-[#1a1208]">
                    {job.name}
                  </span>
                  <span className="text-[#6b5244]">
                    {" "}
                    {job.service} in {job.location}
                  </span>
                  <span className="ml-2 text-yellow-500">★ {job.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
