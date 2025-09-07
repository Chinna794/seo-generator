import { z } from "zod";

export type SeoFormInput = z.input<typeof seoFormSchema>;
export type SeoFormOutput = z.output<typeof seoFormSchema>;

const langCode = /^[a-z]{2}(-[A-Z]{2})?$/; // ej: "es" o "es-MX"
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // "mi-post-super-seo"

export enum SeoFormKeys {
  title = "title",
  description = "description",
  slug = "slug",
  canonicalUrl = "canonicalUrl",
  language = "language",
  robots = "robots",
  content = "content",
  images = "images",
  og = "og",
  twitter = "twitter",
  hreflangs = "hreflangs",
  structuredData = "structuredData",
  breadcrumbs = "breadcrumbs",
}

export const seoFormSchema = z
  .object({
    // Basics
    [SeoFormKeys.title]: z.string().trim().min(3, "Title too short (≥3)").max(100, "Title too long (≤100)"),

    [SeoFormKeys.description]: z.string().trim(),

    [SeoFormKeys.slug]: z.string().trim().regex(slugPattern, "Use kebab-case, a-z, 0-9 and hyphens"),

    [SeoFormKeys.canonicalUrl]: z.url(),

    [SeoFormKeys.language]: z.string().regex(langCode, "Use formats like 'en' or 'es-MX'"),

    // Indexation
    [SeoFormKeys.robots]: z
      .object({
        index: z.boolean().default(true),
        follow: z.boolean().default(true),
        noarchive: z.boolean().optional(),
        nosnippet: z.boolean().optional(),
      })
      .default({ index: true, follow: true }),

    // Content
    [SeoFormKeys.content]: z.object({
      h1: z.string().trim().min(3, "H1 required"),
      wordCount: z.number().int().min(300, "Target ≥300 words"),
      headings: z
        .array(z.object({ level: z.enum(["h2", "h3"]), text: z.string().trim().min(3) }))
        .max(20)
        .default([]),
    }),

    // Media
    [SeoFormKeys.images]: z
      .array(z.object({ url: z.url(), alt: z.string().trim().min(5).max(120) }))
      .max(10)
      .default([]),

    // Social (Open Graph / Twitter)
    [SeoFormKeys.og]: z
      .object({
        type: z.enum(["website", "article", "product"]).default("article"),
        title: z.string().trim().min(3).max(60).optional(),
        description: z.string().trim().min(20).max(160).optional(),
        imageUrl: z.url().optional(),
      })
      .default({ type: "article" }),

    [SeoFormKeys.twitter]: z
      .object({
        card: z.enum(["summary", "summary_large_image"]).default("summary_large_image"),
        site: z
          .string()
          .regex(/^@[\w_]{1,15}$/, "Ej: @yourUsername")
          .optional(),
      })
      .default({ card: "summary_large_image" }),

    // Hreflang
    [SeoFormKeys.hreflangs]: z.array(z.object({ lang: z.string().regex(langCode), url: z.url() })).optional(),

    // Basic structured data (JSON-LD)
    [SeoFormKeys.structuredData]: z
      .object({
        type: z.enum(["WebPage", "Article", "Product"]).default("Article"),
        author: z.string().trim().min(2).optional(),
        publishedAt: z.iso.datetime().optional(), // ISO 8601
        modifiedAt: z.iso.datetime().optional(),
      })
      .default({ type: "Article" }),

    // Navigation
    [SeoFormKeys.breadcrumbs]: z.array(z.object({ name: z.string().trim().min(1).max(60), url: z.url() })).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.hreflangs) {
      const langs = val.hreflangs.map((h) => h.lang);
      const dup = langs.find((l, i) => langs.indexOf(l) !== i);
      if (dup) ctx.addIssue({ code: "custom", message: `hreflang duplicate: ${dup}`, path: ["hreflangs"] });
    }
    if (val.structuredData?.publishedAt && val.structuredData?.modifiedAt) {
      const pub = Date.parse(val.structuredData.publishedAt);
      const mod = Date.parse(val.structuredData.modifiedAt);
      if (!Number.isNaN(pub) && !Number.isNaN(mod) && mod < pub) {
        ctx.addIssue({
          code: "custom",
          message: "modifiedAt cannot be before publishedAt",
          path: ["structuredData", "modifiedAt"],
        });
      }
    }
  });

export const defaultSeoFormSchemaValue: SeoFormInput = {
  [SeoFormKeys.title]: "",
  [SeoFormKeys.description]: "",
  [SeoFormKeys.slug]: "",
  [SeoFormKeys.canonicalUrl]: "",
  [SeoFormKeys.language]: "",

  [SeoFormKeys.robots]: { index: true, follow: true },

  [SeoFormKeys.content]: {
    h1: "SEO on-page",
    wordCount: 300,
    headings: [],
  },

  [SeoFormKeys.images]: [],

  [SeoFormKeys.og]: { type: "article" },
  [SeoFormKeys.twitter]: { card: "summary_large_image" },

  // [SeoFormKeys.hreflangs]: [],
  [SeoFormKeys.structuredData]: { type: "Article" },
  [SeoFormKeys.breadcrumbs]: [],
};
