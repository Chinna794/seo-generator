import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FAQ = { q: string; a: string };
type SiteLink = { label: string; href?: string };
type Media = { src: string; alt?: string };

export type SerpPreviewProps = {
  title: string;
  href?: string;
  breadcrumb: string; // "site.com › category › page"
  faviconUrl?: string;
  description?: string;
  dateISO?: string; // e.g. "2025-04-15"
  rating?: number; // 0..5
  ratingCount?: number; // e.g. 1234
  typeLabel?: string;
  sitelinks?: SiteLink[];
  faqs?: FAQ[];
  media?: Media[];
  className?: string;
};

function Star({ filled = true, className }: { filled?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-3 w-3", className)}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function SerpPreview({
  title,
  href,
  breadcrumb,
  faviconUrl,
  description,
  dateISO,
  rating,
  ratingCount,
  typeLabel,
  sitelinks = [],
  faqs = [],
  media = [],
  className,
}: SerpPreviewProps) {
  const hasRating = typeof rating === "number" && rating! >= 0;
  const dateStr = dateISO
    ? new Date(dateISO).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
    : null;

  return (
    <Card className={cn("bg-background max-w-[680px]", className)}>
      <CardContent className="p-4 sm:p-5">
        {/* URL / Breadcrumb */}
        <div className="text-muted-foreground mb-1.5 flex items-center gap-2 text-xs">
          <Avatar className="h-4 w-4 rounded-md">
            <AvatarImage src={faviconUrl} alt="" />
            <AvatarFallback className="rounded-md text-[10px]">·</AvatarFallback>
          </Avatar>
          <div className="truncate">{breadcrumb}</div>
        </div>

        {/* Title */}
        <h3 className="mb-1 text-xl font-semibold leading-snug">
          {href ? (
            <a
              href={href}
              className="text-primary visited:text-violet-600 hover:underline dark:visited:text-violet-400"
              target="_blank"
              rel="noreferrer"
            >
              {title}
            </a>
          ) : (
            <span className="text-primary">{title}</span>
          )}
        </h3>

        {/* Meta line */}
        {(dateStr || hasRating || typeLabel) && (
          <div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
            {dateStr && <span>{dateStr}</span>}
            {hasRating && (
              <span className="inline-flex items-center gap-1">
                <span className="inline-flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      filled={i < Math.round(Math.min(5, Math.max(0, rating!)))}
                      className={cn(i < (rating ?? 0) ? "text-yellow-500" : "text-muted-foreground/50")}
                    />
                  ))}
                </span>
                <span className="tabular-nums">{(rating ?? 0).toFixed(1)}</span>
                {typeof ratingCount === "number" && <span>({ratingCount.toLocaleString()})</span>}
              </span>
            )}
            {typeLabel && <span>{typeLabel}</span>}
          </div>
        )}

        {/* Description */}
        {description && <p className="text-foreground mb-2 text-sm leading-relaxed">{description}</p>}

        {/* Sitelinks as chips */}
        {sitelinks.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {sitelinks.map((s, i) => (
              <Badge key={i} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                {s.href ? (
                  <a href={s.href} className="hover:underline" target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
              </Badge>
            ))}
          </div>
        )}

        {/* FAQ / Rich result */}
        {faqs.length > 0 && (
          <div className="mb-3 rounded-lg border">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="px-3 text-sm">{f.q}</AccordionTrigger>
                  <AccordionContent className="px-3 pb-3 text-sm leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Media thumbs */}
        {media.length > 0 && (
          <div className="mt-2 flex gap-3">
            {media.slice(0, 3).map((m, i) => (
              <Image
                key={i}
                src={m.src}
                alt={m.alt ?? ""}
                className="h-20 w-32 shrink-0 rounded-md border object-cover"
                width={128}
                height={64}
                priority
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
