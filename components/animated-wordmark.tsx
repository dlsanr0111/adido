"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Phase = "intro" | "collapse";

type Token =
  | { kind: "cap"; id: string; char: string; tone: "a" | "di" | "do" }
  | { kind: "dim"; id: string; text: string };

const TOKENS: Token[] = [
  { kind: "cap", id: "A",     char: "A", tone: "a"  },
  { kind: "dim", id: "rtist", text: "rtist" },
  { kind: "dim", id: "sp1",   text: " " },
  { kind: "cap", id: "D1",    char: "D", tone: "di" },
  { kind: "cap", id: "I",     char: "I", tone: "di" },
  { kind: "dim", id: "ddot",  text: "d." },
  { kind: "dim", id: "sp2",   text: " " },
  { kind: "cap", id: "D2",    char: "D", tone: "do" },
  { kind: "cap", id: "O",     char: "O", tone: "do" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const SCHEDULE: { phase: Phase; hold: number }[] = [
  { phase: "intro",    hold: 3000 },
  { phase: "collapse", hold: 2500 },
];

export function AnimatedWordmark() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    if (reduce) {
      setPhase("collapse");
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
              className={`wordmark-cap wordmark-cap--${tok.tone} inline-block`}
            >
              {tok.char}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </span>
  );
}
