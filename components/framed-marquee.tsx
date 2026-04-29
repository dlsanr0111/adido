import Image from "next/image";

type Frame = { src: string; alt: string };

export function FramedMarquee({
  items,
  durationSec = 50,
  ariaLabel,
}: {
  items: Frame[];
  durationSec?: number;
  ariaLabel?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className="marquee-viewport" role="region" aria-label={ariaLabel ?? "Gallery preview"}>
      <div aria-hidden className="marquee-fade marquee-fade--left" />
      <div aria-hidden className="marquee-fade marquee-fade--right" />
      <ul className="marquee-track" style={{ animationDuration: `${durationSec}s` }}>
        {loop.map((frame, i) => {
          const isClone = i >= items.length;
          return (
            <li key={i} className="marquee-item" aria-hidden={isClone}>
              <figure className="frame-art">
                <div className="frame-art__inner">
                  <Image
                    src={frame.src}
                    alt={isClone ? "" : frame.alt}
                    fill
                    sizes="(max-width: 640px) 240px, (max-width: 1280px) 300px, 340px"
                    className="object-cover"
                  />
                </div>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
