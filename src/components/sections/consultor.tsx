"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  BellRing,
  Camera,
  Check,
  ChartPie,
  ListChecks,
  MessageSquareText,
  Mic,
  Paperclip,
  SendHorizontal,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

type Msg = (typeof site.consultor.chat)[number];

const featureIcons: LucideIcon[] = [MessageSquareText, ListChecks, ChartPie, BellRing];

export function Consultor() {
  return (
    <section id="consultor" className="relative overflow-x-clip py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-[30%] h-[520px] w-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(30,160,118,0.22),transparent_72%)] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
        {/* Celular com a conversa */}
        <FadeIn className="flex justify-center" amount={0.2}>
          <PhoneChat />
        </FadeIn>

        {/* Texto + itens */}
        <div className="flex flex-col">
          <FadeIn className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{site.consultor.eyebrow}</span>
            <h2 className="max-w-[16ch] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
              {site.consultor.title}
            </h2>
            <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">{site.consultor.subtitle}</p>
          </FadeIn>

          <Stagger stagger={0.1} className="mt-8 flex flex-col gap-3">
            {site.consultor.features.map((f, i) => {
              const Icon = featureIcons[i] ?? Check;
              return (
                <StaggerItem key={f} className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-[15px] font-semibold sm:text-base">{f}</span>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ---------- Celular (CSS) com conversa em loop ---------- */

const STEP_MS = 1100; // entre mensagens
const TYPING_MS = 900; // "digitando…" antes da resposta
const END_PAUSE_MS = 2800; // pausa no fim antes de recomeçar

export function PhoneChat() {
  const chat = site.consultor.chat;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  // shown = quantas mensagens estão visíveis; typing = indicador antes da próxima resposta
  const [state, setState] = useState({ shown: 0, typing: false });

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let id: number;
    const { shown, typing } = state;

    if (shown >= chat.length) {
      id = window.setTimeout(() => setState({ shown: 0, typing: false }), END_PAUSE_MS);
    } else if (chat[shown].from === "bot" && !typing) {
      id = window.setTimeout(() => setState({ shown, typing: true }), 500);
    } else {
      id = window.setTimeout(() => setState({ shown: shown + 1, typing: false }), typing ? TYPING_MS : STEP_MS);
    }
    return () => window.clearTimeout(id);
  }, [state, inView, reduceMotion, chat]);

  const visible = reduceMotion ? chat : chat.slice(0, state.shown);
  const showTyping = !reduceMotion && state.typing;

  return (
    <div ref={ref} className="relative w-[300px] sm:w-[320px]">
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[60px] bg-primary/20 blur-2xl" />
      {/* Moldura */}
      <div className="rounded-[44px] border border-white/10 bg-[#0B0F0E] p-2.5 shadow-[0_40px_90px_-30px_rgba(14,26,21,0.6)]">
        <div className="relative overflow-hidden rounded-[36px] bg-[#EEF3F0]">
          {/* Notch */}
          <div aria-hidden className="absolute top-2 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[#0B0F0E]" />

          {/* Cabeçalho do chat */}
          <div className="flex items-center gap-3 bg-primary px-4 pt-11 pb-3 text-white">
            <span className="flex size-9 items-center justify-center rounded-full bg-white/20 text-sm font-extrabold">C</span>
            <div className="leading-tight">
              <p className="text-sm font-bold">Consultor {site.company}</p>
              <p className="text-[11px] text-white/80">{showTyping ? "digitando…" : "online"}</p>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex h-[400px] flex-col justify-end gap-2 overflow-hidden px-3 pb-3 pt-4">
            <AnimatePresence initial={false}>
              {visible.map((m, i) => (
                <Bubble key={`${i}-${m.text}`} msg={m} />
              ))}
              {showTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="mr-auto flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm"
                  aria-label="Consultor digitando"
                >
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-1.5 animate-typing rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Barra de digitar */}
          <div className="flex items-center gap-2 border-t border-border/60 bg-white px-3 py-2.5">
            <Paperclip className="size-4 text-muted-foreground" aria-hidden />
            <span className="flex-1 rounded-full bg-[#F4F6F5] px-3 py-1.5 text-xs text-muted-foreground">Mensagem</span>
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
              <SendHorizontal className="size-4" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const user = msg.from === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-snug shadow-sm",
        user ? "ml-auto rounded-br-md bg-primary text-white" : "mr-auto rounded-bl-md bg-white text-foreground",
      )}
    >
      {msg.kind === "text" && (user ? msg.text : <BotText text={msg.text} />)}
      {msg.kind === "audio" && <AudioBubble duration={msg.text} />}
      {msg.kind === "image" && <ImageBubble label={msg.text} />}
    </motion.div>
  );
}

function BotText({ text }: { text: string }) {
  const ok = text.includes("✓");
  if (!ok) return <span className="font-medium">{text}</span>;
  const [head, ...rest] = text.split("✓");
  return (
    <span className="flex items-center gap-1.5 font-medium">
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Check className="size-2.5" strokeWidth={3} aria-hidden />
      </span>
      <span>
        <span className="font-bold text-primary">{head.trim()}</span>
        {rest.join("").trim() && <span className="text-muted-foreground"> {rest.join("").trim()}</span>}
      </span>
    </span>
  );
}

function AudioBubble({ duration }: { duration: string }) {
  return (
    <span className="flex items-center gap-2">
      <Mic className="size-4 shrink-0" aria-hidden />
      <span className="flex h-5 items-end gap-[2px]" aria-hidden>
        {[0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.8, 0.55, 0.9, 0.6, 0.45, 0.8, 0.5].map((h, i) => (
          <span
            key={i}
            className="w-[3px] origin-bottom animate-wave rounded-full bg-white/90"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </span>
      <span className="text-[11px] tabular-nums text-white/85">{duration}</span>
    </span>
  );
}

function ImageBubble({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-14 w-11 shrink-0 flex-col justify-center gap-1 rounded-md bg-white/95 px-1.5 shadow-sm" aria-hidden>
        <span className="h-1 w-5 rounded bg-foreground/60" />
        <span className="h-1 w-7 rounded bg-foreground/25" />
        <span className="h-1 w-6 rounded bg-foreground/25" />
        <span className="h-1 w-4 rounded bg-foreground/25" />
        <span className="mt-0.5 h-1.5 w-6 rounded bg-primary/70" />
      </span>
      <span className="flex items-center gap-1.5 text-[12px] text-white/90">
        <Camera className="size-3.5 shrink-0" aria-hidden />
        {label}
      </span>
    </span>
  );
}

