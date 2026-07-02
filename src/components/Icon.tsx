import {
  Cable,
  Wrench,
  Clock,
  Container,
  ShieldCheck,
  Gauge,
  Truck,
  Tractor,
  Construction,
  Building2,
  Factory,
  Phone,
  MessageSquareText,
  CircleCheck,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/data/types";

/**
 * Icon — thin wrapper over Lucide (professional icon set). Data files reference
 * icons by IconKey; this maps them to Lucide components. Same `<Icon name=... />`
 * API the rest of the app already uses.
 */
const MAP: Record<IconKey, LucideIcon> = {
  hose: Cable,
  wrench: Wrench,
  clock: Clock,
  trailer: Container,
  shield: ShieldCheck,
  gauge: Gauge,
  truck: Truck,
  tractor: Tractor,
  excavator: Construction,
  building: Building2,
  factory: Factory,
  phone: Phone,
  message: MessageSquareText,
  check: CircleCheck,
  pin: MapPin,
};

export interface IconProps {
  name: IconKey;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, className, strokeWidth = 1.75 }: IconProps) {
  const Cmp = MAP[name];
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden />;
}

export default Icon;
