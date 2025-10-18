import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string; // e.g., website, article
  robots?: string; // e.g., index,follow or noindex,nofollow
  jsonLd?: Record<string, any> | Record<string, any>[]; // optional structured data
};

const BASE_URL = "https://www.stravextechnologies.com";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: Record<string, any> | Record<string, any>[]) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = Array.isArray(data) ? JSON.stringify(data) : JSON.stringify(data);
}

export default function SEO({ title, description, path = "/", image = "/stravex-logo.png", type = "website", robots, jsonLd }: SEOProps) {
  useEffect(() => {
    const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const img = image.startsWith("http") ? image : `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;

    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description", content: description });

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: img });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Stravex Technologies" });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: img });

    upsertLink("canonical", url);

    if (robots) {
      upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
      upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: robots });
    }

    if (jsonLd) {
      upsertJsonLd("seo-jsonld", jsonLd);
    }
  }, [title, description, path, image, type, robots, jsonLd]);

  return null;
}
