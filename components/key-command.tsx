import { cn } from "@/lib/utils";
import React from "react";

export default function KeyCommand({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
