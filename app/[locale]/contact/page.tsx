import { ArrowUpRight, Phone, MapPin, Clock, Instagram } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { ko: "/ko/contact", en: "/en/contact", "x-default": "/ko/contact" },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tActions = await getTranslations("actions");
  const isKo = locale === "ko";

  const naverMapUrl = `https://map.naver.com/p/entry/place/${siteConfig.naverPlaceId}`;
  const phoneDigits = siteConfig.contact.phone.replace(/[^0-9+]/g, "");

  const { latitude, longitude } = siteConfig.address.geo;
  const mapsQuery = encodeURIComponent(isKo ? siteConfig.address.ko : siteConfig.address.en);
  // OpenStreetMap allows iframe embeds without an API key (Google blocks X-Frame).
  const dLat = 0.0025;
  const dLng = 0.004;
  const bbox = [longitude - dLng, latitude - dLat, longitude + dLng, latitude + dLat]
    .map((n) => n.toFixed(6))
    .join("%2C");
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

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

      <section className="container-mag pb-24 lg:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Map embed */}
          <Reveal className="lg:col-span-7" initiallyVisible>
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-card)]">
              <iframe
                src={osmEmbed}
                title={`${siteConfig.fullName} — ${t("title")}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">{siteConfig.fullName}</p>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[var(--color-text)]/85">
                  {isKo ? siteConfig.address.ko : siteConfig.address.en}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-rule)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                >
                  Google Maps <ArrowUpRight className="size-3.5" />
                </a>
                <a
                  href={naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-paper)] transition-transform hover:-translate-y-0.5"
                >
                  {t("naverMap")} <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Info list */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1} initiallyVisible>
              <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
                <InfoRow
                  icon={<MapPin className="size-4" />}
                  label={t("addressLabel")}
                  value={isKo ? siteConfig.address.ko : siteConfig.address.en}
                />
                <InfoRow
                  icon={<Phone className="size-4" />}
                  label={t("phoneLabel")}
                  value={
                    <a href={`tel:${phoneDigits}`} className="hover:text-[var(--color-ink)]">
                      {siteConfig.contact.phone}
                    </a>
                  }
                />
                <InfoRow
                  icon={<Clock className="size-4" />}
                  label={t("hoursLabel")}
                  value={
                    <ul className="space-y-1">
                      {(isKo ? siteConfig.hours.ko : siteConfig.hours.en).map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  }
                />
                <InfoRow
                  icon={<Instagram className="size-4" />}
                  label="Instagram"
                  value={
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-ink)]"
                    >
                      @adido__official
                    </a>
                  }
                />
              </ul>
            </Reveal>

            <Reveal delay={0.2} initiallyVisible>
              <div className="mt-10 flex flex-col items-start gap-3">
                <a
                  href={siteConfig.social.naverBooking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm tracking-[0.08em] text-[var(--color-paper)] transition-transform hover:-translate-y-0.5"
                >
                  {tActions("bookOnNaver")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={`tel:${phoneDigits}`}
                  className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] underline-offset-8 hover:text-[var(--color-ink)] hover:underline"
                >
                  {tActions("callNow")} · {siteConfig.contact.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-5 py-6">
      <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-rule)] text-[var(--color-muted)]">
        {icon}
      </span>
      <div className="flex-1">
        <p className="eyebrow">{label}</p>
        <div className="mt-2 text-sm leading-relaxed text-[var(--color-text)]/85 lg:text-[15px]">
          {value}
        </div>
      </div>
    </li>
  );
}
