"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "@/i18n/navigation";
import type { ReactNode } from "react";

/**
 * Subtle 220ms fade between routes. Honors prefers-reduced-motion.
 *
 * Keyed by pathname so each route mount triggers a fresh fade-in. Avoids the
 * jarring flash you get with route-level streaming, while staying short
 * enough not to feel heavy.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
