export function formatPrice(value: number, locale: string = "ko") {
  if (locale === "ko") return `${value.toLocaleString("ko-KR")}원`;
  return `₩${value.toLocaleString("en-US")}`;
}
