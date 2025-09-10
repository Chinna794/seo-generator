import * as React from "react";

import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";

export function ComponentSource({
  src,
  title,
  language,
  className,
}: React.ComponentProps<"div"> & {
  src?: string;
  title?: string;
  language?: string;
}) {
  const [highlightedCode, setHighlightedCode] = React.useState<string | undefined>();

  const code: string | undefined = src;

  const lang = language ?? title?.split(".").pop() ?? "tsx";

  // const highlightedCode = await highlightCode(code);
  React.useEffect(() => {
    async function load() {
      const highlighted = await highlightCode(code! ?? "");
      setHighlightedCode(highlighted);
    }
    load();
  }, [code]);

  if (!code) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      <ComponentCode highlightedCode={highlightedCode ?? ""} language={lang} title={title} />
    </div>
  );
}

function ComponentCode({
  highlightedCode,
  language,
  title,
}: {
  highlightedCode: string;
  language: string;
  title: string | undefined;
}) {
  return (
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {title}
        </figcaption>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className="[&_pre]:bg-zinc-900! custom-scroll [&>pre]:text-wrap [&>pre]:rounded-md [&>pre]:p-1 [&_code]:text-[13px] [&_pre]:max-h-[450px] [&_pre]:overflow-auto"
      />
    </figure>
  );
}
