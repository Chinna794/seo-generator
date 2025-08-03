# Seo Generator

SEO Metadata Tags by Type 1. Title
• <title>
• <meta property="og:title">
• <meta name="twitter:title">

2. Description
• <meta name="description">
• <meta property="og:description">
• <meta name="twitter:description">

3. Image
• <meta property="og:image">
• <meta name="twitter:image">

4. URL
• <link rel="canonical">
• <meta property="og:url">

5. Content Type
• <meta property="og:type">
• <meta name="twitter:card"> (e.g., summary, summary_large_image, etc.)

6. Site/Social
• <meta property="og:site_name">
• <meta name="twitter:site">
• <meta name="twitter:creator">

⸻

Unique or Specific Tags
• Meta Robots
• <meta name="robots">
• <meta name="googlebot">
• Open Graph: Locale
• <meta property="og:locale">
• Alternate/Hreflang
• <link rel="alternate" hreflang="...">
• Meta Viewport
• <meta name="viewport">
• Favicon & Icons
• <link rel="icon">
• <link rel="apple-touch-icon">
• <link rel="manifest">
• Structured Data
• <script type="application/ld+json">
• Microdata (itemscope, itemtype)
• RDFa (vocab, typeof, etc.)
• Meta Charset
• <meta charset="utf-8">
• Meta Theme Color / Mobile Web
• <meta name="theme-color">
• <meta name="apple-mobile-web-app-capable">
• <meta name="apple-mobile-web-app-status-bar-style">
• Author/Publisher
• <meta name="author">
• <link rel="author">
• <link rel="publisher">
• Social Media Specifics
• <meta property="fb:app_id">
• <meta name="pinterest-rich-pin">
• Other network-specific tags
• Meta Keywords
• <meta name="keywords">

## Example Data

{
  "title": "Awesome SEO Page for Developers", ✅
  "description": "This page demonstrates how to use metadata fields for perfect SEO and social sharing previews on the modern web.", ✅
  "url": "https://example.com/awesome-seo-page", ✅
  "image": "https://example.com/images/seo-preview.png", ✅
  "type": "article",
  "locale": "en_US",
  "siteName": "Example Developer Blog",
  "twitterCard": "summary_large_image", ✅
  "twitterSite": "@exampledev", ✅
  "twitterCreator": "@johndoe", ✅
  "robots": "index, follow",
  "canonical": "https://example.com/awesome-seo-page", ✅
  "author": "John Doe",
  "keywords": "SEO,metadata,Open Graph,Twitter Cards,canonical,web development"
}
