import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "long" | "short" | "accent";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide",
        tone === "muted" && "bg-raised text-muted",
        tone === "long" && "bg-long-dim text-long",
        tone === "short" && "bg-short-dim text-short",
        tone === "accent" && "bg-accent text-accent-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
