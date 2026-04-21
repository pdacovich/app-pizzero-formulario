# APP Pizzeros | Formulario de validación + panel admin

Web app responsive construida con **Next.js + TypeScript + Supabase** para investigar necesidades reales de Pizzeros y dueños de Pizzería, captar interés en una beta y administrar internamente las respuestas.

## Qué incluye
- Formulario público multipaso, mobile first y una pregunta por pantalla.
- Submit server-side a Supabase.
- Pantalla final de agradecimiento.
- Panel admin privado con login, filtros, detalle, notas internas y tags.
- Exportación CSV.
- Esquema SQL inicial con RLS para tablas internas.
- Base preparada para automatizaciones futuras (`outbound_events`).

## Stack
- Next.js App Router
- TypeScript
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- Zod para validación
- CSS global simple, sin sobreingeniería

## Variables de entorno
Copiá `.env.example` a `.env.local` y completá:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Instalación
```bash
npm install
npm run dev
```

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Puesta en marcha de Supabase
1. Crear el proyecto en Supabase.
2. Ejecutar `supabase/001_initial_schema.sql`.
3. Crear usuarios admin en Supabase Auth.
4. Insertar cada usuario habilitado en `public.admin_users`.

## Estructura
```text
app/
  api/
  admin/
  gracias/
components/
  admin/
  survey/
features/
  admin/
  survey/
lib/
  domain/
  supabase/
supabase/
docs/
```

## Rutas principales
- `/`: formulario público
- `/gracias`: pantalla final
- `/admin/login`: login admin
- `/admin/responses`: listado y filtros
- `/admin/responses/[id]`: detalle y edición interna

## Decisiones técnicas
- El submit público no escribe directo desde cliente: usa `POST /api/survey/submit`.
- El permiso de contacto se modela como una sola elección: `email`, `whatsapp`, `both`, `none`.
- Los campos `email` y `whatsapp` se muestran de forma condicional.
- El panel admin depende de usuarios de Supabase Auth habilitados manualmente en `admin_users`.
- La automatización queda preparada, no activa.

## Deploy
Se puede desplegar en Vercel u otra plataforma compatible con Next.js.

Checklist mínimo:
1. Cargar variables de entorno.
2. Ejecutar el SQL inicial.
3. Crear al menos un admin.
4. Verificar login admin y submit público.

## Siguientes pasos recomendados
- Conectar `outbound_events` con Resend, Edge Functions o n8n.
- Agregar dashboards agregados si después hacen falta.
- Incorporar seeds o fixtures para testing manual del panel.
