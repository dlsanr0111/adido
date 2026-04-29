/**
 * Single source of truth for store-wide metadata.
 * Update phone/address/hours/booking links here without touching components.
 */

export const siteConfig = {
  name: "ADido",
  fullName: "ADido HAIR & MAKE UP",
  slogan: {
    ko: "les grands trans-parents",
    en: "les grands trans-parents",
  },
  tagline: {
    ko: "일상을 끌어올리는 손길",
    en: "A touch that elevates your everyday",
  },
  description: {
    ko: "ADido는 헤어와 메이크업을 매거진처럼 다루는 살롱입니다. 자연스러운 결과 안에 단단한 디자인을 담습니다.",
    en: "ADido treats hair and makeup with editorial precision. Quiet design, lasting impact.",
  },
  /** Replace these with the real values when provided */
  contact: {
    phone: "02-517-9591",
    phoneIntl: "+82-2-517-9591",
    email: "hello@adido.kr",
    kakao: "https://pf.kakao.com/_xxxxx",
  },
  address: {
    ko: "서울 강남구 도산대로 421 JS빌딩 3층",
    en: "3F, JS Building, 421 Dosan-daero, Gangnam-gu, Seoul, Republic of Korea",
    geo: { latitude: 37.5238957, longitude: 127.0419809 },
  },
  /** Naver Place ID — used for review/embed links */
  naverPlaceId: "1209499953",
  hours: {
    ko: ["화–일 10:00 – 18:00", "월 정기휴무"],
    en: ["Tue – Sun 10:00 – 18:00", "Closed Mondays"],
    /** Schema.org openingHours format */
    schema: ["Tu-Su 10:00-18:00"],
  },
  social: {
    instagram: "https://instagram.com/adido__official",
    naverPlace: "",
    naverBooking: "https://map.naver.com/p/entry/place/1209499953?lng=127.0419809&lat=37.5238957&placePath=/stylist?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202604281728&locale=ko&svcName=map_pcv5&entry=plt&searchType=place",
  },
  /** Used for absolute URLs in metadata, OG, JSON-LD */
  url: "https://adido.kr",
  /**
   * Search-console site verification — paste the meta-tag content values from
   * Google / Naver / Bing webmaster tools.
   */
  verification: {
    google: "",
    naver: "",
    bing: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
