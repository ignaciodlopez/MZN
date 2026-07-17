import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { cn } from "@/lib/utils";

interface AnimatedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export function AnimatedLink({
  active = false,
  className,
  children,
  href,
  onClick,
  ...rest
}: AnimatedLinkProps) {
  const { scrollTo } = useSmoothScroll();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (href?.startsWith("#")) {
      event.preventDefault();
      scrollTo(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group relative inline-flex min-h-11 items-center py-2 transition-colors duration-300",
        active ? "text-foreground" : "text-muted hover:text-foreground",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-cinematic",
          "group-hover:origin-left group-hover:scale-x-100",
          active && "origin-left scale-x-100",
        )}
      />
    </a>
  );
}
