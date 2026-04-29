import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: t("events"),
    alternates: {
      canonical: `/${locale}/events`,
      languages: { ko: "/ko/events", en: "/en/events", "x-default": "/ko/events" },
    },
  };
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="container-mag flex min-h-[60vh] flex-col justify-center pt-12 pb-20 lg:pt-40 lg:pb-32">
      <Reveal initiallyVisible>
        <p className="eyebrow">Coming soon</p>
      </Reveal>
      <Reveal delay={0.1} initiallyVisible>
        <h1 className="mt-6 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.96] tracking-[-0.02em]">
          Event
        </h1>
      </Reveal>
      <Reveal delay={0.2} initiallyVisible>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
          {locale === "ko"
            ? "ADido의 시즌 이벤트와 프로모션 소식을 곧 이곳에서 만나보실 수 있습니다."
            : "Seasonal events and promotions from ADido will be announced here soon."}
        </p>
      </Reveal>
    </section>
  );
}
