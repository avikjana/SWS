"use client";
import { useState, useEffect, useRef } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  function startAnimation() {
    if (isAnimating) return;
    setIsAnimating(true);
    startTimeRef.current = null;

    function animate(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = start + (end - start) * eased;

      setCount(parseFloat(currentCount.toFixed(decimals)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const display = `${prefix}${decimals > 0 ? count.toFixed(decimals) : Math.round(count)}${suffix}`;

  return { count, display, startAnimation, isAnimating };
}
