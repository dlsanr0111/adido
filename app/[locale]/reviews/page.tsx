import { ArrowUpRight, Instagram, Star } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviews" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/reviews`,
      languages: { ko: "/ko/reviews", en: "/en/reviews", "x-default": "/ko/reviews" },
    },
  };
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reviews");
  const naverPlaceUrl = `https://map.naver.com/p/entry/place/${siteConfig.naverPlaceId}/review/visitor`;

  return (
    <>
      <section className="container-mag pt-12 pb-10 lg:pt-40 lg:pb-24">
        <Reveal initiallyVisible>
          <p className="eyebrow">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.1} initiallyVisible>
          <h1 className="mt-6 font-display text-balance text-[clamp(3rem,7.5vw,7rem)] leading-[0.96] tracking-[-0.02em]">
            {t("title")}
          </h1>
        </Reveal>
        <Reveal delay={0.2} initiallyVisible>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--color-muted)] lg:text-lg">
            {t("lead")}
          </p>
        </Reveal>
      </section>

      <section className="container-mag pb-32">
        <div className="grid gap-6 border-t border-[var(--color-rule)] pt-12 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <a
              href={naverPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-[4/3] flex-col justify-between border border-[var(--color-rule)] p-8 transition-colors hover:border-[var(--color-ink)] lg:p-12"
            >
              <div className="flex items-center gap-3">
                <Star className="size-5 fill-[var(--color-accent)] stroke-[var(--color-accent)]" />
                <span className="eyebrow">Naver Place</span>
              </div>
              <div>
                <p className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.01em]">
                  {t("naverPlaceCta")}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ink)]">
                  Open <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-[4/3] flex-col justify-between bg-[var(--color-ink)] p-8 text-[var(--color-paper)] transition-colors hover:bg-[var(--color-accent-dark)] lg:p-12"
            >
              <div className="flex items-center gap-3">
                <Instagram className="size-5" />
                <span className="eyebrow text-[var(--color-paper)]/70">Instagram</span>
              </div>
              <div>
                <p className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.01em]">
                  {t("instagramCta")}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-paper)]/60 transition-colors group-hover:text-[var(--color-paper)]">
                  Open <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
