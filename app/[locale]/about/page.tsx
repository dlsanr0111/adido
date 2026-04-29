import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title").replace("\n", " "),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ko: "/ko/about", en: "/en/about", "x-default": "/ko/about" },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tActions = await getTranslations("actions");

  return (
    <>
      {/* Hero */}
      <section className="container-mag pt-12 pb-12 lg:pt-40 lg:pb-32">
        <Reveal initiallyVisible>
          <p className="eyebrow">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.1} initiallyVisible>
          <h1 className="mt-6 whitespace-pre-line font-display text-balance text-[clamp(3rem,8vw,8rem)] leading-[0.96] tracking-[-0.02em]">
            {t("title")}
          </h1>
        </Reveal>
        <Reveal delay={0.2} initiallyVisible>
          <p className="mt-12 max-w-2xl text-pretty text-base leading-[1.85] text-[var(--color-text)]/80 lg:text-lg">
            {t("lead")}
          </p>
        </Reveal>
      </section>

      {/* Spread 1 — left photo, right text */}
      <section className="bg-[var(--color-card)]">
        <div className="container-mag grid items-center gap-8 py-12 lg:grid-cols-12 lg:gap-16 lg:py-36">
          <Reveal className="lg:col-span-7">
            <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/6]">
              <Image
                src="/images/styling-area-main.jpg"
                alt="ADido 메인 스타일링 공간"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="eyebrow">01 — Brand</p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.04]">
                {t("section1Title")}
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 max-w-prose text-pretty text-base leading-[1.9] text-[var(--color-text)]/80 lg:text-[17px]">
                {t("section1Body")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Spread 2 — full-bleed pull quote */}
      <section className="container-mag py-14 lg:py-40">
        <Reveal>
          <p className="eyebrow">02 — Method</p>
        </Reveal>
        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.04]">
              {t("section2Title")}
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-pretty text-base leading-[1.9] text-[var(--color-text)]/80 lg:text-[17px]">
              {t("section2Body")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Spread 3 — dark editorial closer */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="container-mag grid items-end gap-8 py-14 lg:grid-cols-12 lg:gap-16 lg:py-40">
          <Reveal className="lg:col-span-6">
            <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
              <Image
                src="/images/lounge-waiting.jpg"
                alt="ADido 라운지 대기 공간"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <p className="eyebrow text-[var(--color-paper)]/55">03 — Place</p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.04] text-[var(--color-paper)]">
                {t("section3Title")}
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 max-w-prose text-pretty text-base leading-[1.9] text-[var(--color-paper)]/75 lg:text-[17px]">
                {t("section3Body")}
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <a
                href={siteConfig.social.naverBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-flex items-center gap-3 rounded-full bg-[var(--color-paper)] px-6 py-3 text-sm tracking-[0.08em] text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
              >
                {tActions("bookOnNaver")}
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
