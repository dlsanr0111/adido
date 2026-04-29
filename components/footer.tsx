import { getTranslations } from "next-intl/server";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("footer");
  const isKo = locale === "ko";

  return (
    <footer className="mt-32 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="container-mag py-20">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-[var(--color-paper)]/60">{siteConfig.fullName}</p>
            <h2 className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-tight text-[var(--color-paper)]">
              ADido
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--color-paper)]/70">
              {isKo ? siteConfig.description.ko : siteConfig.description.en}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="eyebrow text-[var(--color-paper)]/50">{t("address")}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-paper)]/85">
                {isKo ? siteConfig.address.ko : siteConfig.address.en}
              </p>
            </div>
            <div>
              <p className="eyebrow text-[var(--color-paper)]/50">{t("phone")}</p>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="mt-3 block text-sm text-[var(--color-paper)]/85 hover:text-[var(--color-accent-dark)]"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow text-[var(--color-paper)]/50">{t("hours")}</p>
              <ul className="mt-3 space-y-1 text-sm text-[var(--color-paper)]/85">
                {(isKo ? siteConfig.hours.ko : siteConfig.hours.en).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-paper)]/15 pt-8 text-xs text-[var(--color-paper)]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. {t("rights")}.</p>
          <div className="flex items-center gap-4">
            <span className="eyebrow text-[var(--color-paper)]/40">{t("follow")}</span>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-[var(--color-accent-dark)]"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
