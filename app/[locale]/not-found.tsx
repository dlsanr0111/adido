import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";

export default async function LocaleNotFound() {
  const t = await getTranslations("common");

  return (
    <section className="container-mag flex min-h-[80vh] flex-col justify-center py-24">
      <Reveal initiallyVisible>
        <p className="eyebrow font-display text-base text-[var(--color-muted)]">{t("notFoundEyebrow")}</p>
      </Reveal>
      <Reveal delay={0.1} initiallyVisible>
        <h1 className="mt-6 whitespace-pre-line font-display text-balance text-[clamp(3rem,8vw,8rem)] leading-[0.96] tracking-[-0.02em]">
          {t("notFoundTitle")}
        </h1>
      </Reveal>
      <Reveal delay={0.2} initiallyVisible>
        <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--color-muted)] lg:text-lg">
          {t("notFoundBody")}
        </p>
      </Reveal>
      <Reveal delay={0.3} initiallyVisible>
        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm tracking-[0.08em] text-[var(--color-paper)] transition-transform hover:-translate-y-0.5"
        >
          {t("backToHome")} →
        </Link>
      </Reveal>
    </section>
  );
}
