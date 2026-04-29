"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "prices", href: "/prices" },
  { key: "designers", href: "/designers" },
  { key: "gallery", href: "/gallery" },
  { key: "events", href: "/events" },
  { key: "reviews", href: "/reviews" },
  { key: "notice", href: "/notice" },
  { key: "contact", href: "/contact" },
] as const;

export function MobileNav() {
  const t = useTranslations("nav");
  const tActions = useTranslations("actions");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--color-ink)] text-[var(--color-paper)]"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={tCommon("menu")}
        >
          <div className="container-mag flex h-16 items-center justify-between lg:h-20">
            <span className="font-display text-2xl tracking-tight">{siteConfig.name}</span>
            <button
              type="button"
              aria-label={tCommon("closeMenu")}
              onClick={() => setOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full text-[var(--color-paper)] transition-colors hover:bg-[var(--color-paper)]/10"
            >
              <X className="size-5" />
            </button>
          </div>

          <motion.nav
            aria-label="Mobile primary"
            className="container-mag mt-8"
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
            }}
          >
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.key}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between border-b border-[var(--color-paper)]/10 py-5"
                  >
                    <span className="font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-none tracking-tight text-[var(--color-paper)]">
                      {t(item.key)}
                    </span>
                    <ArrowUpRight className="size-5 text-[var(--color-paper)]/45 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-paper)]" />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-3 pb-12">
              <a
                href={siteConfig.social.naverBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-paper)] px-6 py-4 text-sm tracking-[0.08em] text-[var(--color-ink)]"
              >
                {tActions("bookOnNaver")}
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="text-center text-xs uppercase tracking-[0.18em] text-[var(--color-paper)]/65 hover:text-[var(--color-paper)]"
              >
                {tActions("callNow")} · {siteConfig.contact.phone}
              </a>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label={tCommon("openMenu")}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:bg-[var(--color-card)] lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
