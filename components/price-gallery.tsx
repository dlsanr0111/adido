"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type PriceCard = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

export function PriceGallery({ items }: { items: PriceCard[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  // Lock body scroll + listen for Escape while a tile is zoomed
  useEffect(() => {
    if (active === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {items.map((card, i) => (
          <li key={card.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${card.alt} 확대`}
              className="group block w-full overflow-hidden bg-[var(--color-card)] shadow-[0_2px_18px_-10px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]"
            >
              <Image
                src={card.src}
                alt={card.alt}
                width={card.w}
                height={card.h}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                priority={i < 3}
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={items[active].alt}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8 lg:p-12"
            style={{ perspective: 1600 }}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={() => setActive(null)}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActive(null);
              }}
              aria-label="닫기"
              className="absolute right-6 top-6 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            {/* Page-flipping zoomed image (Y-axis right→left) */}
            <motion.div
              key={active}
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
              initial={reduce ? { rotateY: 0, opacity: 1 } : { rotateY: -360, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { rotateY: -360, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, min(900px, 88vw)"
                className="object-contain drop-shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
