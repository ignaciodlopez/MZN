import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}

export function Container({ children, className, as: Tag = "div", id }: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-[min(calc(100%-2rem),1600px)] md:w-[min(calc(100%-5rem),1600px)] xl:w-[min(calc(100%-8rem),1600px)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
