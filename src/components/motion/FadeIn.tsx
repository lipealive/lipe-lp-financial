"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

type FadeInProps = HTMLMotionProps<"div"> & {
  /** Direção do deslocamento inicial. */
  direction?: Direction;
  /** Deslocamento em px. */
  distance?: number;
  /** Blur inicial em px (0 desliga). */
  blur?: number;
  delay?: number;
  duration?: number;
  /** Anima só uma vez quando entra na viewport. */
  once?: boolean;
  /** Quanto do elemento precisa estar visível (0–1). */
  amount?: number;
};

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function FadeIn({
  direction = "up",
  distance = 16,
  blur = 6,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.25,
  children,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[direction];

  const initial = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: offset.x * distance,
        y: offset.y * distance,
        filter: `blur(${blur}px)`,
      };

  return (
    <motion.div
      data-reveal=""
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: reduceMotion ? 0.2 : duration, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
