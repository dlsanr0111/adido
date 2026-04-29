import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { PriceGallery, type PriceCard } from "@/components/price-gallery";

const MENU: PriceCard[] = [
  { src: "/images/menu/01-cut.jpg",            alt: "컷 메뉴",          w: 794, h: 1123 },
  { src: "/images/menu/02-mens.jpg",           alt: "남성 메뉴",        w: 905, h: 1280 },
  { src: "/images/menu/03-womens-color.jpg",   alt: "여성 염색 메뉴",   w: 905, h: 1280 },
  { src: "/images/menu/04-womens-perm.jpg",    alt: "여성 펌 메뉴",     w: 905, h: 1280 },
  { src: "/images/menu/05-clinic.jpg",         alt: "클리닉 메뉴",      w: 794, h: 1123 },
  { src: "/images/menu/06-makeup-mood.png",    alt: "무드 메이크업",    w: 905, h: 1280 },
  { src: "/images/menu/07-makeup-event.png",   alt: "행사 메이크업",    w: 905, h: 1280 },
  { src: "/images/menu/08-makeup-wedding.png", alt: "웨딩 메이크업",    w: 905, h: 1280 },
  { src: "/images/menu/09-nail.png",           alt: "네일 메뉴",        w: 905, h: 1280 },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "prices" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/prices`,
      languages: { ko: "/ko/prices", en: "/en/prices", "x-default": "/ko/prices" },
    },
  };
}

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("prices");
  const tActions = await getTranslations("actions");

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="container-mag pt-12 pb-10 lg:pt-40 lg:pb-20">
          <Reveal initiallyVisible>
            <p className="eyebrow">{t("eyebrow")}</p>
          </Reveal>
          <Reveal delay={0.1} initiallyVisible>
            <h1 className="mt-6 font-display text-balance text-[clamp(3rem,7.5vw,7rem)] leading-[0.96] tracking-[-0.02em]">
              {t("title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2} initiallyVisible>
            <p className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted)] lg:text-lg">
              {t("lead")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Menu image grid — click any card to zoom in with a flip-rotation */}
      <section className="bg-white">
        <div className="container-mag pb-24 lg:pb-32">
          <PriceGallery items={MENU} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[var(--color-card)] py-24 lg:py-32">
        <div className="container-mag grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">{tActions("bookOnNaver")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 whitespace-pre-line font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.04]">
                {t("ctaTitle")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
                {t("ctaBody")}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="lg:col-span-5">
            <a
              href={siteConfig.social.naverBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-7 py-4 text-sm font-medium tracking-[0.08em] text-[var(--color-paper)] transition-transform hover:-translate-y-0.5 lg:float-right"
            >
              {tActions("bookOnNaver")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
