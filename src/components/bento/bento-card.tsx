"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StaggerItem } from "@/components/motion";

type BentoCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

const MAX_TILT = 4; // graus

/**
 * Card de funcionalidade (carrossel): entra com animação, e no desktop
 * (ponteiro fino) tem tilt 3D leve + spotlight que segue o mouse.
 */
export function BentoCard({ icon: Icon, title, description, children, className }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [0, 1], [MAX_TILT, -MAX_TILT]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-MAX_TILT, MAX_TILT]), { stiffness: 200, damping: 20 });
  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);
  const spotOpacity = useSpring(hover, { stiffness: 200, damping: 30 });
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${spotX} ${spotY}, rgba(30,160,118,0.16), transparent 65%)`;

  function finePointer() {
    return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !finePointer() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    hover.set(1);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
    hover.set(0);
  }

  return (
    <StaggerItem className={cn("h-full [perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_40px_-24px_rgba(14,26,21,0.25)] transition-shadow duration-300 hover:shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_24px_60px_-24px_rgba(14,26,21,0.35)] sm:p-6"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: spotlight, opacity: spotOpacity }}
        />

        <div className="relative flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-[18px]" strokeWidth={2.25} aria-hidden />
          </span>
          <h3 className="text-base font-bold tracking-tight sm:text-lg">{title}</h3>
        </div>
        <p className="relative mt-2 text-sm text-pretty text-muted-foreground sm:text-[15px]">
          {description}
        </p>

        {children && <div className="relative mt-4">{children}</div>}
      </motion.div>
    </StaggerItem>
  );
}
