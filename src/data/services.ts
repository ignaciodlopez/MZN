import { Clapperboard, Scissors, Lightbulb } from "lucide-react";
import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "direccion-audiovisual",
    index: "01",
    name: "Dirección audiovisual",
    description:
      "Dirección de videoclips, comerciales y piezas publicitarias con una mirada cinematográfica.",
    icon: Clapperboard,
  },
  {
    id: "edicion-vfx-sfx",
    index: "02",
    name: "Edición · VFX · SFX",
    description:
      "Montaje, efectos visuales y sonoros al servicio del ritmo y la narrativa de cada pieza.",
    icon: Scissors,
  },
  {
    id: "desarrollo-creativo",
    index: "03",
    name: "Desarrollo creativo, comerciales y campañas",
    description:
      "Concepto, identidad visual y ejecución integral para artistas, marcas y agencias.",
    icon: Lightbulb,
  },
];
