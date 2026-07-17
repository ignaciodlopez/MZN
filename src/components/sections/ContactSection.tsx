import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FadeUp } from "@/components/motion/FadeUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";
import { contactSchema, projectTypes, type ContactFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full border-b border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs text-error">
      {message}
    </p>
  );
}

function ContactForm({ endpoint }: { endpoint: string }) {
  const accessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY;
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", projectType: "", message: "", company: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    // Honeypot completado: se descarta en silencio para no dar pistas al bot.
    if (values.company) {
      reset();
      setStatus("success");
      return;
    }

    setStatus("submitting");
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          projectType: values.projectType,
          message: values.message,
          subject: `Nuevo contacto desde el portfolio — ${values.projectType}`,
          ...(accessKey ? { access_key: accessKey } : {}),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`El servicio respondió con estado ${response.status}`);
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div>
        <label
          htmlFor="contact-name"
          className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
        >
          Nombre
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={cn(fieldClasses, errors.name && "border-error")}
          {...register("name")}
        />
        <FieldError id="contact-name-error" message={errors.name?.message} />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
        >
          Correo electrónico
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={cn(fieldClasses, errors.email && "border-error")}
          {...register("email")}
        />
        <FieldError id="contact-email-error" message={errors.email?.message} />
      </div>

      <div>
        <label
          htmlFor="contact-project-type"
          className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
        >
          Tipo de proyecto
        </label>
        <select
          id="contact-project-type"
          aria-invalid={errors.projectType ? true : undefined}
          aria-describedby={errors.projectType ? "contact-project-type-error" : undefined}
          className={cn(fieldClasses, "bg-background", errors.projectType && "border-error")}
          {...register("projectType")}
        >
          <option value="" disabled>
            Seleccioná una opción
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <FieldError id="contact-project-type-error" message={errors.projectType?.message} />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Contame sobre tu proyecto: idea, fechas, referencias…"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(fieldClasses, "resize-y", errors.message && "border-error")}
          {...register("message")}
        />
        <FieldError id="contact-message-error" message={errors.message?.message} />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="contact-company">No completar este campo</label>
        <input
          id="contact-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <MagneticButton className="w-fit">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
          </Button>
        </MagneticButton>
      </div>

      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {status === "success" && (
          <span className="text-success">Mensaje enviado. Te respondo a la brevedad.</span>
        )}
        {status === "error" && (
          <span className="text-error">
            No se pudo enviar el mensaje. Probá de nuevo o escribime a {site.email}.
          </span>
        )}
      </p>
    </form>
  );
}

function ContactFallback() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info(
        "Formulario de contacto sin configurar: definí VITE_CONTACT_ENDPOINT en tu archivo .env para activarlo.",
      );
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 border border-line p-8">
      <p className="text-base text-foreground">
        El formulario todavía no está conectado a un servicio de envío.
      </p>
      <p className="text-sm leading-relaxed text-muted">
        Mientras tanto podés escribirme directamente por correo. Para activar el formulario,
        configurá la variable <code className="text-foreground">VITE_CONTACT_ENDPOINT</code> con
        un servicio como Web3Forms, Formspree o un Cloudflare Worker propio.
      </p>
      <ButtonLink href={`mailto:${site.email}`} variant="outline" className="w-fit">
        <Mail aria-hidden="true" className="h-4 w-4" />
        Escribir por correo
      </ButtonLink>
    </div>
  );
}

export function ContactSection() {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  return (
    <section id="contacto" className="border-t border-line py-section">
      <Container>
        <FadeUp>
          <SectionLabel>Contacto</SectionLabel>
        </FadeUp>

        <RevealText
          as="h2"
          text="Hablemos de tu próximo proyecto."
          className="mt-10 max-w-5xl font-display text-[clamp(2.75rem,8vw,8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-foreground"
        />

        <FadeUp delay={0.1} className="mt-8 flex max-w-[65ch] flex-col gap-4">
          <p className="text-base leading-relaxed text-muted">
            Contame la idea, la canción, la marca o simplemente la sensación que querés
            transmitir.
          </p>
          <p className="text-base leading-relaxed text-muted">
            Estoy disponible para colaborar en videoclips, comerciales y proyectos
            audiovisuales.
          </p>
        </FadeUp>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <FadeUp className="flex flex-col gap-10 lg:col-span-5">
            <p className="flex items-center gap-3 text-sm text-foreground">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-success motion-safe:animate-pulse"
              />
              {site.availability}
            </p>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
                Correo
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block break-all font-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold text-foreground underline-offset-8 transition-colors hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {site.email}
              </a>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
                Ubicación
              </p>
              <p className="mt-2 text-base text-foreground">{site.location}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">Redes</p>
              <ul className="mt-2 flex flex-col gap-1">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-3 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <span className="w-20 text-foreground">{link.label}</span>
                      {link.handle}
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.12} className="relative lg:col-span-6 lg:col-start-7">
            {endpoint ? <ContactForm endpoint={endpoint} /> : <ContactFallback />}
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
