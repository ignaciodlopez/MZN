import { site } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";
import { withBasePath } from "@/lib/paths";
import { siteUrl } from "@/lib/utils";

export function buildJsonLd(): string {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Director audiovisual, filmmaker y editor",
    email: `mailto:${site.email}`,
    url: siteUrl,
    image: `${siteUrl}${withBasePath("images/social/og-image.svg")}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rosario",
      addressCountry: "AR",
    },
    sameAs: socialLinks.map((link) => link.url),
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — Dirección audiovisual`,
    description:
      "Dirección audiovisual, videoclips, publicidad, edición, postproducción, color grading y fotografía de eventos.",
    url: siteUrl,
    areaServed: "Argentina",
    founder: { "@type": "Person", name: site.name },
  };

  return JSON.stringify([person, service]);
}
