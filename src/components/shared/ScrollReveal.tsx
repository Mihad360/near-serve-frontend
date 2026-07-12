"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`${inView ? "reveal-visible" : "reveal-hidden"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
