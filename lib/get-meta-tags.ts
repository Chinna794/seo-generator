import { SeoFormState } from "@/store/use-seo-form-store";

type MetaTagsProps = Omit<
  SeoFormState,
  "setTitle" | "setDescription" | "setImageFile" | "setUrl" | "getIsFormComplete"
>;
export function getMetaTagsCode(props: MetaTagsProps) {
  return `
    <!-- Charset & Viewport -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>${props.title}</title>
    <meta name="title" content="${props.title}" />
    <meta name="description" content="${props.description}" />

    <!-- Canonical -->
    ${props.url ? `<link rel="canonical" href="${props.url}" />` : ""}

    <!-- Robots -->
    <meta name="robots" content="index, follow" />

    <!-- Theme color -->
    <meta name="theme-color" content="#ffffff" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    ${props.url ? `<meta property="og:url" content="${props.url}" />` : ""}
    <meta property="og:title" content="${props.title}" />
    <meta property="og:description" content="${props.description}" />
    <meta property="og:image" content="${props.imageFile ? "/public/" + props.imageFile.file.name : ""}" />
    <meta property="og:image:alt" content="${props.title}" />
    <meta property="og:site_name" content="${props.title}" />

    <!-- X (Twitter) -->
    <meta name="twitter:card" content="summary_large_image" />
    ${props.url ? `<meta name="twitter:url" content="${props.url}" />` : ""}
    <meta name="twitter:title" content="${props.title}" />
    <meta name="twitter:description" content="${props.description}" />
    <meta name="twitter:image" content="${props.imageFile ? "/public/" + props.imageFile.file.name : ""}" />
    <meta name="twitter:image:alt" content="${props.title}" />

    <!-- Language -->
    <meta http-equiv="content-language" content="en" />

    <!-- Tags Generated with https://seo-generator.vercel.app -->
  `;
}
