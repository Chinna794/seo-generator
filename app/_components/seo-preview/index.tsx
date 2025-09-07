"use client";
import { useMemo } from "react";
import { useSeoFormStore } from "@/store/seo-form-store";
import { SerpPreview } from "./serp-preview";

function getHost(url: string): string | null {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

function getPath(url: string): string | null {
  try {
    return new URL(url).pathname.replace(/^\/+/, "");
  } catch {
    return null;
  }
}

function buildBreadcrumb(host: string | null, path: string | null, fallbackSlug: string): string {
  const left = host ?? "example.com";
  const right = (path && path.length > 0 ? path : fallbackSlug).replace(/\/+/g, "/");
  const segments = right.split("/").filter(Boolean);
  return [left, ...segments].join(" › ");
}

export default function SEOPreview() {
  const values = useSeoFormStore((s) => s.values);

  const { href, faviconUrl, breadcrumb, dateISO, typeLabel, media, sitelinks, title, description } = useMemo(() => {
    const host = getHost(values.canonicalUrl);
    const pathFromUrl = getPath(values.canonicalUrl);

    const hrefComputed = host ? values.canonicalUrl : "#";
    const favicon = host
      ? `https://www.google.com/s2/favicons?domain=${host}`
      : "https://www.google.com/s2/favicons?domain=example.com";

    const breadcrumbStr = buildBreadcrumb(host, pathFromUrl, values.slug);

    const date = values.structuredData?.publishedAt ?? undefined;

    const ogType = values.og?.type ?? "article";
    const noindex = values.robots?.index === false ? " · noindex" : "";
    const label = `${ogType}${noindex}`;

    const thumbs = (values.images ?? []).slice(0, 3).map((img) => ({
      src: img.url,
      alt: img.alt,
    }));

    const links = (values.breadcrumbs ?? []).slice(0, 6).map((b) => ({
      label: b.name,
      href: b.url,
    }));

    return {
      href: hrefComputed,
      faviconUrl: favicon,
      breadcrumb: breadcrumbStr,
      dateISO: date,
      typeLabel: label,
      media: thumbs,
      sitelinks: links,
      title: values.title,
      description: values.description,
    };
  }, [values]);

  return (
    <main className="mx-auto flex max-w-[720px] flex-col gap-6">
      <SerpPreview
        title={title || "Meta Tags — Preview, Edit and Generate"}
        href={href}
        breadcrumb={breadcrumb}
        faviconUrl={faviconUrl}
        description={
          description ||
          "Con Meta Tags puedes editar y previsualizar cómo se verá tu contenido en Google, Facebook, X y más. Genera títulos y descripciones SEO-friendly y prueba Open Graph/Twitter Cards."
        }
        dateISO={dateISO}
        typeLabel={typeLabel}
        sitelinks={sitelinks}
        media={media}
      />

      <SerpPreview
        title="Guía SEO 2025: buenas prácticas"
        breadcrumb="midominio.com › blog › seo-2025"
        description="Checklist actualizado de SEO técnico, on-page y rich results para mejorar tu CTR en SERP."
        dateISO="2025-07-01"
        sitelinks={[{ label: "Índice" }, { label: "Schema" }, { label: "Core Web Vitals" }]}
      />
    </main>
  );
}
