import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, Instagram } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { designers } from "@/lib/designers";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return designers.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const d = designers.find((x) => x.slug === slug);
  if (!d) return {};
  return {
    title: `${d.nameKo} ${locale === "ko" ? d.positionKo : d.positionEn}`,
    description: d.bioKo.slice(0, 160) || `${d.nameKo} ${d.positionKo}`,
    alternates: {
      canonical: `/${locale}/designers/${slug}`,
      languages: {
        ko: `/ko/designers/${slug}`,
        en: `/en/designers/${slug}`,
        "x-default": `/ko/designers/${slug}`,
      },
    },
    openGraph: {
      images: [d.image],
    },
  };
}

export default async function DesignerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const d = designers.find((x) => x.slug === slug);
  if (!d) notFound();

  const t = await getTranslations("designers");
  const isKo = locale === "ko";

  // JSON-LD Person
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${d.nameKo} ${isKo ? d.positionKo : d.positionEn}`,
    jobTitle: isKo ? d.positionKo : d.positionEn,
    worksFor: { "@type": "HairSalon", name: "ADido" },
    image: d.image,
    sameAs: d.instagram ? [d.instagram] : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-mag pt-12 pb-20 lg:pt-36 lg:pb-44">
        <Reveal initiallyVisible>
          <Link
            href="/designers"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="size-3.5" /> {t("backToList")}
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6" initiallyVisible>
            <figure className="relative aspect-[3/4] overflow-hidden bg-[var(--color-card)]">
              <Image
                src={d.image}
                alt={`${d.nameKo} — ${isKo ? d.positionKo : d.positionEn}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          </Reveal>

          <div className="lg:col-span-6 lg:pl-6">
            <Reveal delay={0.1} initiallyVisible>
              <p className="eyebrow">{isKo ? d.positionKo : d.positionEn}</p>
              <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.02em]">
                {d.nameKo}
              </h1>
            </Reveal>

            {d.bioKo && (
              <Reveal delay={0.2} initiallyVisible>
                <div className="mt-12 max-w-prose space-y-6 text-base leading-[1.85] text-[var(--color-text)]/85 lg:text-[17px]">
                  {d.bioKo.split("\n\n").map((para, i) => (
                    <p key={i} className="text-pretty">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.3} initiallyVisible>
              <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--color-rule)] pt-8">
                {d.bookingUrl && (
                  <a
                    href={d.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm tracking-[0.08em] text-[var(--color-paper)] transition-transform hover:-translate-y-0.5"
                  >
                    {t("bookCta")}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {d.instagram && (
                  <a
                    href={d.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] underline-offset-8 hover:text-[var(--color-ink)] hover:underline"
                  >
                    <Instagram className="size-4" />
                    {t("instagramCta")}
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </article>
    </>
  );
}
