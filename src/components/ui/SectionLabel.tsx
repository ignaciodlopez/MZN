import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent" />
      {children}
    </p>
  );
}
