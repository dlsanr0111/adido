import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/reveal";

type Tile = { src: string; alt: string; span: string };

const TILES: Tile[] = [
  { src: "/images/styling-area-main.jpg",    alt: "메인 스타일링 공간",     span: "col-span-12 md:col-span-8 row-span-2 aspect-[4/5]" },
  { src: "/images/design/design-01.png",     alt: "ADido 디자인 작업",      span: "col-span-6 md:col-span-4 aspect-[4/5]" },
  { src: "/images/design/design-02.png",     alt: "ADido 디자인 작업",      span: "col-span-6 md:col-span-4 aspect-[4/5]" },
  { src: "/images/lounge-waiting.jpg",       alt: "라운지 대기 공간",       span: "col-span-12 md:col-span-7 aspect-[16/10]" },
  { src: "/images/design/design-03.png",     alt: "ADido 디자인 작업",      span: "col-span-6 md:col-span-5 aspect-[4/5]" },
  { src: "/images/design/design-04.png",     alt: "ADido 디자인 작업",      span: "col-span-6 md:col-span-4 aspect-[4/5]" },
  { src: "/images/styling-chairs-front.jpg", alt: "스타일링 체어 정면",     span: "col-span-6 md:col-span-4 aspect-[4/5]" },
  { src: "/images/design/design-05.png",     alt: "ADido 디자인 작업",      span: "col-span-12 md:col-span-4 aspect-[4/5]" },
  { src: "/images/design/design-06.png",     alt: "ADido 디자인 작업",      span: "col-span-6 md:col-span-4 aspect-[4/5]" },
  { src: "/images/design/design-07.png",     alt: "ADido 디자인 작업",      span: "col-span-6 md:col-span-4 aspect-[4/5]" },
  { src: "/images/private-room.jpg",         alt: "프라이빗 룸",            span: "col-span-6 md:col-span-5 aspect-[4/5]" },
  { src: "/images/shampoo-area.jpg",         alt: "샴푸 공간",              span: "col-span-6 md:col-span-7 aspect-[16/10]" },
  { src: "/images/design/design-08.png",     alt: "ADido 디자인 작업",      span: "col-span-12 md:col-span-12 aspect-[16/9]" },
  { src: "/images/styling-area-side.jpg",    alt: "스타일링 공간 측면 뷰",  span: "col-span-12 md:col-span-6 aspect-[16/10]" },
  { src: "/images/logo-signage.jpg",         alt: "ADido 로고 사인",        span: "col-span-6 md:col-span-3 aspect-[4/5]" },
  { src: "/images/logo-mark.jpg",            alt: "ADido 로고 마크",        span: "col-span-6 md:col-span-3 aspect-[4/5]" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: { ko: "/ko/gallery", en: "/en/gallery", "x-default": "/ko/gallery" },
    },
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  return (
    <>
      <section className="container-mag pt-12 pb-8 lg:pt-40 lg:pb-20">
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
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          {TILES.map((tile, i) => (
            <Reveal key={tile.src + i} delay={(i % 6) * 0.04} className={tile.span}>
              <figure className="group relative h-full w-full overflow-hidden bg-[var(--color-card)]">
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 40vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
