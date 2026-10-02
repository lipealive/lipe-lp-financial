"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { EASE_OUT } from "./FadeIn";

type CountUpProps = {
  value: number;
  /** Dispara a contagem. */
  active: boolean;
  format: (v: number) => string;
  delay?: number;
  duration?: number;
  className?: string;
};

export function CountUp({ value, active, format, delay = 0, duration = 1.6, className }: CountUpProps) {
  const reduceMotion = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, format);

  useEffect(() => {
    if (!active) return;
    const controls = animate(mv, value, {
      duration: reduceMotion ? 0 : duration,
      delay: reduceMotion ? 0 : delay,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [active, value, mv, delay, duration, reduceMotion]);

  return <motion.span className={className}>{text}</motion.span>;
}
