"use client";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useCounter } from "@/hooks/useCounter";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
  decimals = 0,
  className = "",
}: CounterProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { display, startAnimation } = useCounter({
    end,
    suffix,
    prefix,
    duration,
    decimals,
  });
  const started = useRef(false);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      startAnimation();
    }
  }, [inView, startAnimation]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-4xl md:text-5xl font-bold font-display text-gradient-blue mb-2">
        {display}
      </div>
      <div className="text-sm text-[var(--text-secondary)] font-medium">{label}</div>
    </div>
  );
}
