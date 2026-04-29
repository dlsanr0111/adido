/**
 * Pass-through root layout. The real root (html/body, fonts, providers)
 * lives in app/[locale]/layout.tsx so the lang attribute matches the locale.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
