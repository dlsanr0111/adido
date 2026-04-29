import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notice" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/notice`,
      languages: { ko: "/ko/notice", en: "/en/notice", "x-default": "/ko/notice" },
    },
  };
}

export default async function NoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("notice");

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
        <div className="border-t border-[var(--color-rule)]">
          <div className="flex min-h-[40vh] items-center justify-center py-24 text-center">
            <p className="font-display text-2xl text-[var(--color-muted)]">{t("empty")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
