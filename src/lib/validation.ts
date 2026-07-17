import { z } from "zod";

export const projectTypes = [
  "Videoclip",
  "Publicidad",
  "Contenido de marca",
  "Fotografía",
  "Edición",
  "Postproducción",
  "Otro",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre.")
    .max(80, "El nombre es demasiado largo."),

  email: z.string().trim().email("Ingresá un correo electrónico válido."),

  projectType: z.string().min(1, "Seleccioná un tipo de proyecto."),

  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(2000, "El mensaje es demasiado largo."),

  // Honeypot: debe quedar vacío. Los bots suelen completarlo.
  company: z.string().max(0, "Error de validación.").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
