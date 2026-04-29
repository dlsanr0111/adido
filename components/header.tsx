import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "prices", href: "/prices" },
  { key: "designers", href: "/designers" },
  { key: "gallery", href: "/gallery" },
  { key: "events", href: "/events" },
  { key: "contact", href: "/contact" },
] as const;

export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations("nav");
  const tActions = await getTranslations("actions");
  const tCommon = await getTranslations("common");

  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only z-[80] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-[var(--color-paper)]"
      >
        {tCommon("skipToContent")}
      </a>

      <header className="sticky top-0 z-50 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-paper)]/70">
        <div className="container-mag flex h-16 items-center justify-between gap-6 lg:h-20 lg:gap-8">
          <Link
            href="/"
            className="font-display text-2xl tracking-tight text-[var(--color-ink)] lg:text-[1.7rem]"
            aria-label={`${siteConfig.name} — Home`}
          >
            {siteConfig.name}
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="eyebrow rounded-sm px-1 py-2 transition-colors hover:text-[var(--color-ink)]"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitcher currentLocale={locale} />
            <a
              href={siteConfig.social.naverBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-paper)] transition-colors hover:bg-[var(--color-accent-dark)] sm:inline-flex lg:px-5 lg:py-2.5"
            >
              {tActions("book")}
              <ArrowUpRight className="size-3.5" />
            </a>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
