import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Mini-cards que imitam a UI do app (construídos em código, não são imagens).
 * Usados no hero: flutuando ao redor do vídeo (desktop) e em marquee (mobile).
 */

const cardBase =
  "w-[228px] shrink-0 rounded-2xl border border-white/60 bg-white/85 p-4 text-left text-foreground shadow-[0_24px_60px_-24px_rgba(14,26,21,0.35),0_1px_0_rgba(255,255,255,0.8)_inset] backdrop-blur-md";

export function SaldoCard({ className }: { className?: string }) {
  return (
    <div className={cn(cardBase, className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Saldo do mês</span>
        <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
          Set
        </span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <span className="text-[1.45rem] leading-none font-extrabold tracking-tight tabular-nums">
          R$ 1.333,37
        </span>
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_14px_-6px_rgba(30,160,118,0.9)]">
          <ArrowUpRight className="size-4" strokeWidth={2.5} />
        </span>
      </div>
      <div className="mt-3 flex items-end gap-1" aria-hidden>
        {[38, 52, 44, 68, 58, 80, 92].map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-sm",
              i === 6 ? "bg-primary" : "bg-primary/20",
            )}
            style={{ height: `${h * 0.32}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ReservaCard({ className }: { className?: string }) {
  const pct = 33;
  return (
    <div className={cn(cardBase, className)}>
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="size-5" strokeWidth={2.25} />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-medium text-muted-foreground">Reserva de emergência</p>
          <p className="text-sm font-bold">{pct}% protegido</p>
        </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand-gradient"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground tabular-nums">
        <span>R$ 2.000</span>
        <span>meta R$ 6.000</span>
      </div>
    </div>
  );
}

const slices = [
  { label: "Estudos", pct: 52, color: "var(--primary)" },
  { label: "Vestuário", pct: 26, color: "var(--gold)" },
  { label: "Lazer", pct: 22, color: "var(--brand-blue)" },
];

export function DonutCard({ className }: { className?: string }) {
  const r = 15.9155; // circunferência = 100
  // offset de cada fatia: começa no topo (25) e desconta as anteriores
  const offsets = slices.reduce<number[]>((acc, s, i) => {
    acc.push(i === 0 ? 25 : acc[i - 1] - slices[i - 1].pct);
    return acc;
  }, []);
  return (
    <div className={cn(cardBase, "flex items-center gap-3", className)}>
      <svg viewBox="0 0 42 42" className="size-[72px] shrink-0" aria-hidden>
        <circle cx="21" cy="21" r={r} fill="none" stroke="var(--muted)" strokeWidth="6" />
        {slices.map((s, i) => (
          <circle
            key={s.label}
            cx="21"
            cy="21"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="6"
            strokeDasharray={`${s.pct} ${100 - s.pct}`}
            strokeDashoffset={offsets[i]}
          />
        ))}
        <circle cx="21" cy="21" r="10" fill="white" />
      </svg>
      <ul className="flex flex-col gap-1 text-xs">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: s.color }} />
            <span className="text-muted-foreground">{s.label}</span>
            <span className="ml-auto font-semibold tabular-nums">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
