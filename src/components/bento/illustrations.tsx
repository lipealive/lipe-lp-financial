"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Laptop, MessageCircle, Mic, Moon, Play, Smartphone, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, site } from "@/config/site";
import { CountUp, EASE_OUT } from "@/components/motion";

/* ---------- Metas: barra que enche ---------- */

export function GoalProgress({ label = "Viagem para Bariloche", pct = 68 }: { label?: string; pct?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref}>
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">{label}</span>
          <span className="text-sm font-bold text-primary tabular-nums">
            <CountUp value={pct} active={inView} format={(v) => `${Math.round(v)}%`} />
          </span>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            initial={{ width: 0 }}
            animate={{ width: inView ? `${pct}%` : 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: EASE_OUT, delay: 0.2 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground tabular-nums">
          <span>{formatPrice(5440)} guardados</span>
          <span>meta {formatPrice(8000)}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Investimentos: linha que se desenha ---------- */

const linePoints = [4, 18, 12, 26, 22, 34, 30, 44, 40, 56, 52, 70];

export function InvestmentChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const w = 240;
  const h = 90;
  const step = w / (linePoints.length - 1);
  const pts = linePoints.map((v, i) => [i * step, h - 8 - (v / 72) * (h - 16)] as const);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${d} L${w} ${h} L0 ${h} Z`;

  return (
    <div ref={ref} className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">Rentabilidade acumulada</span>
        <span className="text-sm font-bold text-primary tabular-nums">
          <CountUp value={14.2} active={inView} format={(v) => `+${v.toFixed(1)}%`} />
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="inv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="var(--border)" strokeDasharray="3 4" />
        ))}
        <motion.path
          d={area}
          fill="url(#inv-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: inView ? 1 : reduceMotion ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.6, ease: EASE_OUT }}
        />
        <motion.circle
          cx={pts[pts.length - 1][0]}
          cy={pts[pts.length - 1][1]}
          r="4"
          fill="var(--primary)"
          stroke="white"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
          transition={{ delay: reduceMotion ? 0 : 1.5, type: "spring", stiffness: 300, damping: 15 }}
        />
      </svg>
    </div>
  );
}

/* ---------- Patrimônio: números somando ---------- */

const assets = [
  { label: "Liquidez", value: 4200, color: "bg-primary" },
  { label: "Investimentos", value: 12850, color: "bg-gold" },
  { label: "Bens", value: 38000, color: "bg-brand-blue" },
];

export function NetWorth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const total = assets.reduce((a, b) => a + b.value, 0);

  return (
    <div ref={ref} className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">Patrimônio total</span>
        <span className="text-lg font-extrabold tracking-tight tabular-nums">
          <CountUp value={total} active={inView} format={(v) => formatPrice(Math.round(v))} />
        </span>
      </div>
      <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-muted">
        {assets.map((a) => (
          <motion.span
            key={a.label}
            className={cn("h-full", a.color)}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${(a.value / total) * 100}%` : 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {assets.map((a, i) => (
          <li key={a.label} className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className={cn("size-1.5 shrink-0 rounded-full", a.color)} />
              {a.label}
            </span>
            <span className="font-semibold tabular-nums">
              <CountUp value={a.value} active={inView} delay={i * 0.15} format={(v) => formatPrice(Math.round(v))} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Escola: pilha de aulas (rotaciona enquanto visível) ---------- */

const VISIBLE = 3;
const PEEK = 16; // px que cada carta de trás deixa aparecer
const CARD_H = 56;

export function LessonStack() {
  const lessons = site.school.featured;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setInterval(() => setOffset((o) => (o + 1) % lessons.length), 2600);
    return () => clearInterval(id);
  }, [inView, reduceMotion, lessons.length]);

  // Da frente (depth 0) para trás (depth VISIBLE-1)
  const visible = Array.from({ length: VISIBLE }, (_, depth) => ({
    lesson: lessons[(offset + depth) % lessons.length],
    depth,
  }));

  return (
    <div ref={ref} className="flex flex-col gap-2.5">
      <div className="relative" style={{ height: CARD_H + PEEK * (VISIBLE - 1) }}>
        <AnimatePresence initial={false}>
          {visible.map(({ lesson, depth }) => (
            <motion.div
              key={lesson.n}
              className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-xl border border-border bg-background p-3 shadow-[0_8px_24px_-16px_rgba(14,26,21,0.45)]"
              style={{ height: CARD_H, transformOrigin: "bottom center", zIndex: 10 - depth }}
              initial={{ y: -PEEK * VISIBLE, scale: 1 - VISIBLE * 0.05, opacity: 0 }}
              animate={{ y: -depth * PEEK, scale: 1 - depth * 0.05, opacity: 1 - depth * 0.22 }}
              exit={{ y: 14, scale: 1.02, opacity: 0, transition: { duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Play className="ml-0.5 size-3.5 fill-white" aria-hidden />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-[13px] font-semibold">{lesson.title}</p>
                <p className="text-[11px] text-muted-foreground">Aula {lesson.n} · ebook em PDF</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="text-center text-[11px] font-medium text-muted-foreground">{site.school.footer}</p>
    </div>
  );
}

/* ---------- Celular + computador sincronizando ---------- */

export function DeviceSync() {
  return (
    <div className="rounded-xl border border-border bg-background px-3 py-5">
      <div className="flex items-center justify-center gap-2">
        <Device icon={Smartphone} label="App" sub="iPhone e Android" />
        <Link />
        <Device icon={Laptop} label="Navegador" sub="no computador" />
        <Link delay="0.7s" />
        <Device icon={MessageCircle} label="WhatsApp" sub="com o Consultor" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground">
        <span className="size-1.5 rounded-full bg-dot" aria-hidden />
        Sincronizado agora · mesmo login em tudo
      </div>
    </div>
  );
}

function Link({ delay = "0s" }: { delay?: string }) {
  return (
    <div className="relative h-4 w-8 shrink-0 sm:w-10" aria-hidden>
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-primary/40" />
      <span className="absolute top-1/2 left-0 size-2 -translate-y-1/2 animate-sync-dot rounded-full bg-primary" style={{ animationDelay: delay }} />
    </div>
  );
}

/* ---------- Consultor com IA: mini conversa ---------- */

export function ConsultorMini() {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-3">
      <div className="ml-auto flex max-w-[85%] items-center gap-2 rounded-2xl rounded-br-md bg-primary px-3 py-2 text-[12px] text-white">
        <Mic className="size-3.5 shrink-0" aria-hidden />
        <span className="flex h-4 items-end gap-[2px]" aria-hidden>
          {[0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.8, 0.55, 0.9, 0.6].map((h, i) => (
            <span
              key={i}
              className="w-[3px] origin-bottom animate-wave rounded-full bg-white/90"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </span>
        <span className="tabular-nums">0:04</span>
      </div>
      <div className="mr-auto flex max-w-[85%] items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2 text-[12px] font-medium">
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="size-2.5" strokeWidth={3} aria-hidden />
        </span>
        Lançado · Uber · R$ 23,50
      </div>
      <div className="mr-auto flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2" aria-label="Consultor digitando">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 animate-typing rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

function Device({ icon: Icon, label, sub }: { icon: typeof Smartphone; label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="text-xs font-semibold">{label}</span>
      <span className="text-[10px] text-muted-foreground">{sub}</span>
    </div>
  );
}

/* ---------- Modo claro/escuro alternando sozinho ---------- */

export function ThemeFlip() {
  const [dark, setDark] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setDark((d) => !d), 3200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border p-4 transition-colors duration-700 [&_*]:transition-colors [&_*]:duration-700",
        dark ? "section-dark border-[#1F2A26]" : "border-border bg-background",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Saldo do mês</span>
        <span className="relative size-5">
          <Sun className={cn("absolute inset-0 size-5 text-gold transition-opacity", dark ? "opacity-0" : "opacity-100")} aria-hidden />
          <Moon className={cn("absolute inset-0 size-5 text-[#23B585] transition-opacity", dark ? "opacity-100" : "opacity-0")} aria-hidden />
        </span>
      </div>
      <p className="mt-1 text-xl font-extrabold tracking-tight tabular-nums">{formatPrice(1333.37)}</p>
      <div className="mt-3 flex items-end gap-1" aria-hidden>
        {[30, 48, 40, 62, 54, 76, 90].map((h, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-sm", i === 6 ? (dark ? "bg-[#23B585]" : "bg-primary") : "bg-primary/20")}
            style={{ height: `${h * 0.3}px` }}
          />
        ))}
      </div>
    </div>
  );
}
