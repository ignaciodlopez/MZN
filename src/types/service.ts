import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  index: string;
  name: string;
  description: string;
  icon?: LucideIcon;
}

export interface Metric {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}
