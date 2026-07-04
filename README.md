# Industrias Texano — sitio web

Next.js (App Router) + Tailwind CSS. Sitio bilingüe (ES/EN) construido sobre el diseño de Google Stitch para Industrias Texano.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) (redirige a `/es`).

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

- `RESEND_API_KEY` — API key de [Resend](https://resend.com) para el envío de correos del formulario de contacto (`app/api/contact/route.ts`). Sin esta variable, las solicitudes se registran en la consola del servidor en vez de enviarse por correo.
- `CONTACT_TO_EMAIL` — bandeja que recibe las cotizaciones.

## Pendientes de contenido (assets del cliente)

- **Logo**: ✅ integrado. `components/logo.tsx` usa los archivos oficiales del cliente en `public/brand/` (`logo-ink.png`, `logo-gold.png`, `logo-white.png`, más los íconos sueltos `icon-*.png`).
- **Favicon**: ✅ integrado. `app/icon.png` + `public/favicons/` usan los archivos oficiales del cliente (apple-touch-icon y android-icon), referenciados desde `app/[locale]/layout.tsx` y `public/manifest.json`.
- **Fotografías de producto/planta**: ⚠️ provisionales. `public/images/` contiene las fotos de stock que trae el mockup de Stitch (no son fotografía real del cliente) — se usan como relleno visual temporal vía `components/placeholder-photo.tsx` (acepta un prop `src`; si se omite, muestra una caja con patrón + "Foto pendiente"). Cuando el cliente entregue sus propias fotos, reemplazar los archivos en `public/images/` (o pasar nuevas rutas en cada página) para que se sirvan optimizadas con `next/image`.

## Despliegue (Vercel + GitHub)

1. Sube este repositorio a GitHub.
2. En Vercel, "Import Project" desde ese repositorio (plan Hobby).
3. Configura las variables de entorno (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`) en el proyecto de Vercel.
4. Cada push a la rama principal despliega automáticamente.
5. Dominio personalizado: agregar `industriastexano.com` en Vercel → Settings → Domains, y apuntar los DNS en GoDaddy (registro A/CNAME o cambio de nameservers) según indique Vercel.
