"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { EASE_OUT } from "./FadeIn";

type StaggerProps = HTMLMotionProps<"div"> & {
  /** Intervalo entre cada filho, em segundos. */
  stagger?: number;
  delay?: number;
  /** `true` anima ao entrar na viewport; `false` anima no mount (ex.: hero). */
  inView?: boolean;
  once?: boolean;
  amount?: number;
};

/**
 * Container que anima os filhos em cascata (fade + leve subida + blur saindo).
 * Use <StaggerItem> em cada filho que deve participar da animação.
 */
export function Stagger({
  stagger = 0.09,
  delay = 0,
  inView = true,
  once = true,
  amount = 0.2,
  children,
  ...props
}: StaggerProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      {...(inView ? { whileInView: "show", viewport: { once, amount } } : { animate: "show" })}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  distance?: number;
  blur?: number;
  duration?: number;
  /**
   * Entrada leve: só uma subida de `distance` px, sem opacity 0 nem blur.
   * O conteúdo já fica visível no HTML do servidor (use acima da dobra / LCP).
   */
  subtle?: boolean;
};

export function StaggerItem({
  distance = 18,
  blur = 8,
  duration = 0.7,
  subtle = false,
  children,
  ...props
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  let item: Variants;
  if (subtle) {
    item = {
      hidden: { y: reduceMotion ? 0 : distance },
      show: { y: 0, transition: { duration: reduceMotion ? 0 : duration, ease: EASE_OUT } },
    };
  } else if (reduceMotion) {
    // useReducedMotion resolve só após o mount; por isso o "show" reduzido também
    // zera y/blur, caso o primeiro render tenha aplicado o estado hidden completo.
    item = {
      hidden: { opacity: 0 },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.2 } },
    };
  } else {
    item = {
      hidden: { opacity: 0, y: distance, filter: `blur(${blur}px)` },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration, ease: EASE_OUT } },
    };
  }

  return (
    <motion.div data-reveal="" variants={item} {...props}>
      {children}
    </motion.div>
  );
}
