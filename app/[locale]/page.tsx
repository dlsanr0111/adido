import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { FramedMarquee } from "@/components/framed-marquee";
import { AnimatedWordmark } from "@/components/animated-wordmark";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tActions = await getTranslations("actions");

  const signatureImages = Array.from({ length: 8 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return { src: `/images/design/design-${num}.png`, alt: t("signatureTitle") };
  });

  return (
    <>
      {/* HERO — full-bleed dark editorial with interior background */}
      <section className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="absolute inset-0 -z-10 opacity-60">
          <Image
            src="/images/styling-area-main.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
          />
          <div className="absolute inset-0 bg-[var(--color-ink)]/55" />
        </div>

        <div className="container-mag flex min-h-[80vh] flex-col justify-center gap-10 pt-24 pb-16 lg:min-h-[88vh] lg:gap-12 lg:pt-32">
          <Reveal initiallyVisible>
            <p className="eyebrow text-[var(--color-paper)]/60">{t("eyebrow")}</p>
          </Reveal>

          <div>
            <Reveal delay={0.1} initiallyVisible>
              <h1 className="hero-wordmark text-[var(--color-paper)]">
                <AnimatedWordmark />
              </h1>
            </Reveal>
            <Reveal delay={0.25} initiallyVisible>
              <p className="mt-10 max-w-2xl whitespace-pre-line text-base leading-relaxed text-[var(--color-paper)]/80 lg:text-lg">
                {t("heroLead")}
              </p>
            </Reveal>
            <Reveal delay={0.4} initiallyVisible>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={siteConfig.social.naverBooking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-paper)] px-6 py-3 text-sm font-medium tracking-[0.06em] text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
                >
                  {tActions("bookOnNaver")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link
                  href="/about"
                  className="text-sm uppercase tracking-[0.18em] text-[var(--color-paper)]/70 underline-offset-8 transition-colors hover:text-[var(--color-paper)] hover:underline"
                >
                  About ADido →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW — framed conveyor of design works */}
      <section className="relative bg-[var(--color-card)] py-20 lg:py-28">
        <div className="container-mag">
          <div className="flex items-end justify-between gap-8 border-b border-[var(--color-rule)] pb-8">
            <div>
              <p className="eyebrow">{t("signatureEyebrow")}</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight">
                {t("signatureTitle")}
              </h2>
            </div>
            <Link
              href="/gallery"
              className="hidden items-center gap-2 text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-ink)] sm:inline-flex"
            >
              {tActions("viewMore")} <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <FramedMarquee items={signatureImages} ariaLabel={t("signatureTitle")} />
        </div>
      </section>

      {/* CTA — quiet closing spread */}
      <section className="relative overflow-hidden bg-[var(--color-paper)] py-32 lg:py-44">
        <div className="container-mag grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">{t("ctaEyebrow")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 whitespace-pre-line font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-balance">
                {t("ctaTitle")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-text)]/75 lg:text-lg">
                {t("ctaBody")}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="lg:col-span-5">
            <div className="flex flex-col items-start gap-6 lg:items-end">
              <a
                href={siteConfig.social.naverBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-7 py-4 text-sm font-medium tracking-[0.08em] text-[var(--color-paper)] transition-transform hover:-translate-y-0.5"
              >
                {tActions("bookOnNaver")}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] underline-offset-8 hover:text-[var(--color-ink)] hover:underline"
              >
                {tActions("callNow")} · {siteConfig.contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
