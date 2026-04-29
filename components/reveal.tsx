"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Editorial reveal: fades + 16px slide on viewport entry.
 *
 * Pass `initiallyVisible` for above-the-fold content (hero copy, etc.) so the
 * SSR HTML renders fully visible — the animation still plays once on hydration
 * but the page never flashes blank for users with slow JS.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  initiallyVisible = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  initiallyVisible?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  if (initiallyVisible) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
