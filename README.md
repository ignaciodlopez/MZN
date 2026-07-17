# Portfolio Audiovisual — Sitio estático para Cloudflare Pages

Portfolio premium de estética cinematográfica para un director, filmmaker, fotógrafo y editor de video. Aplicación frontend **completamente estática**: se compila a una carpeta `dist/` que puede publicarse en Cloudflare Pages, GitHub Pages, Netlify o cualquier servidor de archivos estáticos, sin backend ni proceso Node.js permanente.

## Tecnologías

- **React 19** + **TypeScript** (modo estricto, sin `any`)
- **Vite 6** (build y dev server)
- **Tailwind CSS 3** + variables CSS propias
- **Motion for React** (animaciones)
- **Lenis** (smooth scrolling, desactivado con `prefers-reduced-motion`)
- **React Hook Form** + **Zod** (formulario de contacto validado)
- **Lucide React** (iconos)
- ESLint + Prettier

## Características

- Hero a pantalla completa con revelado de texto por líneas e indicador de scroll.
- Sección de proyectos con composiciones editoriales alternadas y preview de video opcional en escritorio.
- Galería fotográfica con lightbox accesible (teclado, focus trap, gestos en móvil), cargado con importación dinámica.
- Modal de showreel (video HTML5) con gestión de foco y cierre con Escape.
- Secciones Sobre mí, Métricas animadas, Servicios y Contacto.
- Loader inicial opcional (una vez por sesión) y cursor personalizado opcional (solo escritorio).
- Menú móvil a pantalla completa con bloqueo de scroll y restauración de foco.
- Accesibilidad WCAG 2.1 AA: skip link, navegación por teclado, `aria-live`, reducción de movimiento respetada en todo el sitio.
- SEO: metadatos Open Graph / Twitter Card, canonical, `robots.txt`, `sitemap.xml`, JSON-LD (`Person` + `ProfessionalService`).
- Headers de seguridad y caché para Cloudflare Pages (`public/_headers`).

## Instalación

```bash
git clone URL_DEL_REPOSITORIO
cd MZN
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:5173/`.

## Build y verificación

```bash
npm run build      # tsc -b + vite build → genera dist/
npm run preview    # sirve dist/ localmente para probar el build
npm run typecheck  # solo comprobación de tipos
npm run lint       # ESLint
npm run format     # Prettier
```

## Variables de entorno

Copiá `.env.example` a `.env` y ajustá los valores. **Nunca subas `.env` al repositorio** (ya está en `.gitignore`). Todo valor `VITE_*` queda expuesto en el navegador: no pongas secretos privados.

| Variable | Descripción |
| --- | --- |
| `VITE_BASE_PATH` | Ruta base de la app. `/` para dominio raíz (Cloudflare Pages). Usar `/subruta/` solo si se aloja en una subcarpeta. |
| `VITE_CONTACT_ENDPOINT` | URL del servicio externo de formularios (Web3Forms, Formspree, Worker…). Si queda vacío, el formulario se reemplaza por un enlace de correo. |
| `VITE_CONTACT_ACCESS_KEY` | Access key **pública** del servicio de formularios (p. ej. Web3Forms). |
| `VITE_SITE_URL` | URL pública del sitio; se usa para canonical, Open Graph y JSON-LD. |
| `VITE_ENABLE_CUSTOM_CURSOR` | `true` / `false` — cursor personalizado en escritorio. |
| `VITE_ENABLE_PAGE_LOADER` | `true` / `false` — loader inicial (una vez por sesión). |

## Edición del contenido

Todo el contenido vive en `src/data/` — no hay textos de negocio dentro de los componentes:

| Qué cambiar | Archivo |
| --- | --- |
| Nombre, roles, ubicación, email, bio del hero, showreel | [src/data/site.ts](src/data/site.ts) |
| Enlaces de navegación | [src/data/navigation.ts](src/data/navigation.ts) |
| Redes sociales (Instagram, Vimeo, YouTube) | [src/data/socialLinks.ts](src/data/socialLinks.ts) |
| Proyectos (título, categoría, roles, año, media) | [src/data/projects.ts](src/data/projects.ts) |
| Galería fotográfica (imagen, alt, artista, año, tamaño) | [src/data/gallery.ts](src/data/gallery.ts) |
| Servicios | [src/data/services.ts](src/data/services.ts) |
| Métricas | [src/data/metrics.ts](src/data/metrics.ts) |
| Colores (variables CSS) y tipografía | [src/styles/globals.css](src/styles/globals.css) y [tailwind.config.ts](tailwind.config.ts) |
| Título, descripción, Open Graph, JSON-LD estático | [index.html](index.html) y [src/lib/seo.ts](src/lib/seo.ts) |

### Reemplazar imágenes y videos

Los archivos actuales en `public/images/` y `public/videos/` son **placeholders SVG de demostración**. Reemplazalos manteniendo las rutas (o actualizá las rutas en `src/data/`):

- `public/images/hero/` — fondo del hero y poster del showreel.
- `public/images/projects/` — miniaturas de proyectos (`project-01` a `project-06`).
- `public/images/gallery/` — fotos de la galería (`live-01` a `live-14`).
- `public/images/about/portrait` — retrato de la sección Sobre mí.
- `public/images/social/og-image` — imagen para redes sociales (usar PNG/JPG de 1200×630 en producción).
- `public/videos/showreel/showreel.mp4` — video del showreel (el modal muestra el poster hasta que exista).
- `public/videos/projects/` — previews MP4 opcionales de proyectos.

Las rutas de recursos se resuelven con `withBasePath()` ([src/lib/paths.ts](src/lib/paths.ts)), así que funcionan igual en dominio raíz o subruta.

## Despliegue en Cloudflare Pages

1. Subí el proyecto a un repositorio de GitHub.
2. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**.
3. **Create application** → pestaña **Pages** → **Connect to Git**.
4. Seleccioná el repositorio y la rama (`main`).
5. Configurá el build:

   ```text
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   Node.js version: LTS (18 o superior)
   ```

6. En **Environment variables** agregá al menos:

   ```env
   VITE_BASE_PATH=/
   VITE_SITE_URL=https://tu-proyecto.pages.dev
   ```

   y, si usás formulario, `VITE_CONTACT_ENDPOINT` y `VITE_CONTACT_ACCESS_KEY`.

7. **Save and Deploy**. El sitio queda en `https://tu-proyecto.pages.dev/`.
8. Para dominio propio: **Custom domains** → agregá el dominio y seguí las instrucciones de DNS.

Los archivos `public/_headers` (seguridad y caché) se aplican automáticamente en Pages.

## Cambiar el dominio

Al pasar a un dominio definitivo, actualizá la URL en estos lugares:

- `VITE_SITE_URL` (variable de entorno en Cloudflare Pages).
- `<link rel="canonical">`, `og:url` y `og:image` en [index.html](index.html).
- `Sitemap:` en [public/robots.txt](public/robots.txt).
- `<loc>` en [public/sitemap.xml](public/sitemap.xml).

## Formulario de contacto

El formulario envía a un endpoint externo configurable; el sitio sigue siendo 100 % estático.

**Web3Forms** (gratuito):

```env
VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit
VITE_CONTACT_ACCESS_KEY=tu-access-key-publica
```

**Formspree**:

```env
VITE_CONTACT_ENDPOINT=https://formspree.io/f/tu-id
VITE_CONTACT_ACCESS_KEY=
```

**Cloudflare Worker propio**: desplegá un Worker separado que reciba el POST JSON (`name`, `email`, `projectType`, `message`) y reenvíe por email. Configurá:

```env
VITE_CONTACT_ENDPOINT=https://api.tu-cuenta.workers.dev/contact
```

El Worker es externo y no forma parte del build de este proyecto. Si `VITE_CONTACT_ENDPOINT` está vacío, el sitio muestra automáticamente un enlace de correo alternativo y nada se rompe.

## Recomendaciones de multimedia

- **Imágenes**: AVIF o WebP, ancho máximo ~1600–2000 px, peso ideal < 300 KB. Definir siempre las dimensiones reales en `src/data/gallery.ts` para evitar saltos de layout.
- **Posters**: WebP/JPG del primer frame del video.
- **Videos**: MP4 H.264, 1080p máximo, bitrate 4–8 Mbps, sin audio en previews, idealmente < 10–15 MB. Para el hero conviene una versión reducida (720p) para móvil.
- **OG image**: PNG o JPG de 1200×630 (los SVG no se muestran en la mayoría de las redes).

## Solución de problemas

| Problema | Causa probable y solución |
| --- | --- |
| Pantalla en blanco tras desplegar | `VITE_BASE_PATH` incorrecto. Para Cloudflare Pages en dominio raíz debe ser `/`. |
| Imágenes o videos no cargan | La ruta en `src/data/` no coincide con el archivo en `public/`. Las rutas se escriben sin `/` inicial (p. ej. `images/projects/project-01.svg`). |
| El formulario muestra solo el enlace de correo | `VITE_CONTACT_ENDPOINT` no está definido en el entorno de build. Agregalo en Cloudflare Pages y redesplegá. |
| Build fallido en Pages | Verificá la versión de Node (LTS) y que `npm run build` funcione localmente sin errores de TypeScript/ESLint. |
| Cambié una variable `VITE_*` y no se refleja | Las variables se inyectan en tiempo de build: hay que volver a compilar/desplegar. |
| El showreel abre pero no reproduce | Falta `public/videos/showreel/showreel.mp4`. Subí tu video con ese nombre o cambiá la ruta en `src/data/site.ts`. |

## Licencia y contenido

Todos los textos, nombres, proyectos y métricas son **ficticios** (datos de demostración). Reemplazalos por contenido real antes de publicar. No incluyas material protegido sin licencia.
