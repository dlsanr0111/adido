"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  return (
    <div role="group" aria-label="Language" className="flex items-center gap-1 text-xs uppercase tracking-[0.16em]">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="contents">
          {i > 0 && <span aria-hidden className="text-[var(--color-rule)]">/</span>}
          <button
            type="button"
            onClick={() => {
              if (loc === currentLocale) return;
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              });
            }}
            aria-current={loc === currentLocale ? "true" : undefined}
            className={
              loc === currentLocale
                ? "font-medium text-[var(--color-ink)]"
                : "text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            }
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
