import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Inter } from "next/font/google";

import "../globals.css";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { PageTransition } from "@/components/page-transition";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sansEn = Inter({
  subsets: ["latin"],
  variable: "--font-sans-en",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const ogTitle = t("siteTitle");
  const ogParams = new URLSearchParams({
    title: ogTitle,
    eyebrow: locale === "ko" ? "헤어 & 메이크업 · 서울" : "Hair & Make Up · Seoul",
    subtitle: "les grands trans-parents",
  });
  const ogImage = `/api/og?${ogParams.toString()}`;

  // Pick the URL crawlers should fetch absolute assets from.
  // Vercel injects VERCEL_PROJECT_PRODUCTION_URL with the stable production
  // host (e.g. adido-foo.vercel.app); when a custom domain is added it switches
  // to that domain automatically. Fall back to siteConfig.url for local dev.
  const productionHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? siteConfig.url.replace(/^https?:\/\//, "");
  const baseUrl = productionHost.startsWith("http")
    ? productionHost
    : `https://${productionHost}`;

  return {
    title: {
      default: t("siteTitle"),
      template: `%s — ${siteConfig.name}`,
    },
    description: t("siteDescription"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        en: "/en",
        "x-default": "/ko",
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.fullName,
      title: t("siteTitle"),
      description: t("siteDescription"),
      url: `${siteConfig.url}/${locale}`,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: [ogImage],
    },
    verification: {
      google: siteConfig.verification.google || undefined,
      other: {
        "naver-site-verification": siteConfig.verification.naver || "",
      },
    },
    other: {
      "msvalidate.01": siteConfig.verification.bing,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sansEn.variable}`}
      style={{ ["--font-sans-ko" as string]: "'Pretendard Variable', Pretendard" }}
    >
      <body className="bg-paper text-[var(--color-text)] antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer locale={locale} />
          <JsonLd locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
