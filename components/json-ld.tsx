import { siteConfig } from "@/lib/site-config";

export function JsonLd({ locale }: { locale: string }) {
  const isKo = locale === "ko";
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    description: isKo ? siteConfig.description.ko : siteConfig.description.en,
    url: `${siteConfig.url}/${locale}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: [`${siteConfig.url}/images/styling-area-main.jpg`, `${siteConfig.url}/images/logo-mark.jpg`],
    address: {
      "@type": "PostalAddress",
      streetAddress: isKo ? siteConfig.address.ko : siteConfig.address.en,
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.geo.latitude,
      longitude: siteConfig.address.geo.longitude,
    },
    openingHoursSpecification: siteConfig.hours.schema,
    priceRange: "₩₩",
    sameAs: [siteConfig.social.instagram, siteConfig.social.naverPlace, siteConfig.social.naverBooking].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
