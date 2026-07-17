import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "outline" | "ghost";

const baseClasses =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-3 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ease-cinematic focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const variantClasses: Record<ButtonVariant, string> = {
  solid: "bg-foreground text-background hover:bg-accent",
  outline: "border border-line-strong text-foreground hover:border-accent hover:text-accent",
  ghost: "px-3 text-muted hover:text-foreground",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "solid", className, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(baseClasses, variantClasses[variant], className)} {...rest} />
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
}

export function ButtonLink({ variant = "solid", className, ...rest }: ButtonLinkProps) {
  return <a className={cn(baseClasses, variantClasses[variant], className)} {...rest} />;
}
