import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { designers, type Designer } from "@/lib/designers";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "designers" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/designers`,
      languages: { ko: "/ko/designers", en: "/en/designers", "x-default": "/ko/designers" },
    },
  };
}

const GROUP_ORDER: Designer["positionEn"][] = [
  "Executive Director",
  "Senior Director",
  "Director",
  "Director · Makeup",
  "Manager",
  "Designer",
];

export default async function DesignersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("designers");
  const isKo = locale === "ko";

  // Group designers by position, in canonical order
  const grouped = GROUP_ORDER.map((position) => ({
    position,
    label: t(`groups.${position}`),
    members: designers.filter((d) => d.positionEn === position),
  })).filter((g) => g.members.length > 0);

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

      <section className="border-t border-[var(--color-rule)]">
        <div className="container-mag space-y-20 py-12 lg:space-y-32 lg:py-20">
          {grouped.map((group, gi) => (
            <div key={group.position}>
              <Reveal initiallyVisible>
                <header className="mb-10 flex items-baseline justify-between border-b border-[var(--color-rule)] pb-4 lg:mb-12">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-2xl text-[var(--color-muted)]/55 tabular-nums lg:text-3xl">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] tracking-tight">
                      {group.label}
                    </h2>
                  </div>
                  <span className="eyebrow text-[var(--color-muted)]/65">
                    {String(group.members.length).padStart(2, "0")}
                  </span>
                </header>
              </Reveal>

              <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-20">
                {group.members.map((d, i) => (
                  <Reveal key={d.slug} delay={(i % 4) * 0.05} initiallyVisible={gi === 0}>
                    <li>
                      <Link href={`/designers/${d.slug}`} className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]">
                        <figure className="relative aspect-[3/4] overflow-hidden bg-[var(--color-card)]">
                          <Image
                            src={d.image}
                            alt={`${d.nameKo} — ${isKo ? d.positionKo : d.positionEn}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                            priority={gi === 0 && i < 4}
                          />
                        </figure>
                        <figcaption className="mt-4 flex items-baseline justify-between gap-2">
                          <div className="min-w-0">
                            <p className="eyebrow truncate">{isKo ? d.positionKo : d.positionEn}</p>
                            <h3 className="mt-1 truncate font-display text-2xl tracking-tight lg:text-[1.7rem]">
                              {d.nameKo}
                            </h3>
                          </div>
                          <ArrowUpRight className="size-4 shrink-0 text-[var(--color-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-ink)]" />
                        </figcaption>
                      </Link>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
