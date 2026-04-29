import koData from "@/content/services.ko.json";
import enData from "@/content/services.en.json";

export type ServiceItem = {
  name: string;
  subtitle?: string;
  price?: number;
  featured?: boolean;
};

export type ServiceCategory = {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  inquireOnly?: boolean;
  items: ServiceItem[];
};

export type ServicesData = {
  currency: string;
  note: string;
  categories: ServiceCategory[];
};

export function getServices(locale: string): ServicesData {
  return (locale === "en" ? enData : koData) as ServicesData;
}

export function hasEventPrice(cat: ServiceCategory): boolean {
  return cat.items.some(
    (it) => it.subtitle?.includes("이벤트") || it.subtitle?.toLowerCase().includes("event")
  );
}
