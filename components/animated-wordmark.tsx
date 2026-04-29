"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Phase = "intro" | "collapse" | "lowerize";

type Token =
  | { kind: "cap"; id: string; upper: string; lower: string; tone: "a" | "di" | "do" }
  | { kind: "dim"; id: string; text: string };

const TOKENS: Token[] = [
  { kind: "cap", id: "A",     upper: "A", lower: "A", tone: "a"  },
  { kind: "dim", id: "rtist", text: "rtist" },
  { kind: "dim", id: "sp1",   text: " " },
  { kind: "cap", id: "D1",    upper: "D", lower: "D", tone: "di" },
  { kind: "cap", id: "I",     upper: "I", lower: "i", tone: "di" },
  { kind: "dim", id: "ddot",  text: "d." },
  { kind: "dim", id: "sp2",   text: " " },
  { kind: "cap", id: "D2",    upper: "D", lower: "d", tone: "do" },
  { kind: "cap", id: "O",     upper: "O", lower: "o", tone: "do" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const SCHEDULE: { phase: Phase; hold: number }[] = [
  { phase: "intro",    hold: 3000 },
  { phase: "collapse", hold: 1100 },
  { phase: "lowerize", hold: 5000 },
  { phase: "collapse", hold: 1100 },
];

export function AnimatedWordmark() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    if (reduce) {
      setPhase("lowerize");
      return;
    }
    let i = 0;
    let timeout: number;
    const tick = () => {
      setPhase(SCHEDULE[i].phase);
      timeout = window.setTimeout(() => {
        i = (i + 1) % SCHEDULE.length;
        tick();
      }, SCHEDULE[i].hold);
    };
    tick();
    return () => window.clearTimeout(timeout);
  }, [reduce]);

  const showDim = phase === "intro";
  const showLower = phase === "lowerize";

  return (
    <span aria-label="ADido" className="inline-flex flex-wrap items-baseline">
      <AnimatePresence initial={false}>
        {TOKENS.map((tok) => {
          if (tok.kind === "dim" && !showDim) return null;

          if (tok.kind === "dim") {
            return (
              <motion.span
                key={tok.id}
                layout
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 0.18, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="wordmark-dim inline-block overflow-hidden whitespace-pre"
              >
                {tok.text}
              </motion.span>
            );
          }

          return (
            <motion.span
              key={tok.id}
              layout
              transition={{ layout: { duration: 0.85, ease: EASE } }}
              className={`wordmark-cap wordmark-cap--${tok.tone} relative inline-block`}
            >
              <span aria-hidden className="invisible">
                {showLower ? tok.lower : tok.upper}
              </span>
              <motion.span
                aria-hidden
                initial={false}
                animate={{ opacity: showLower ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-x-0 bottom-0 leading-[inherit]"
              >
                {tok.upper}
              </motion.span>
              <motion.span
                aria-hidden
                initial={false}
                animate={{ opacity: showLower ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-x-0 bottom-0 leading-[inherit]"
              >
                {tok.lower}
              </motion.span>
            </motion.span>
          );
        })}
      </AnimatePresence>
    </span>
  );
}
