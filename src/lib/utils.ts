export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isEnabled(flag: string | undefined): boolean {
  return flag === "true";
}

export const siteUrl: string = (import.meta.env.VITE_SITE_URL ?? "https://example.pages.dev").replace(
  /\/+$/,
  "",
);
