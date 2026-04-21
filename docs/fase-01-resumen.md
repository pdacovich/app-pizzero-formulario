# Fase 01 - Formulario de validación + panel admin base

## Objetivo de la fase
Construir una primera versión funcional de la web app para captar investigación de producto, registrar interés en beta, guardar permisos de contacto y administrar internamente las respuestas.

## Decisiones tomadas
- Una sola app en Next.js con formulario público y panel privado.
- Supabase como backend principal para persistencia, auth y políticas.
- Submit público server-side para no exponer escritura directa desde cliente.
- Panel admin protegido por Supabase Auth + tabla interna `admin_users`.
- Automatización solo preparada a nivel de estructura mediante `outbound_events`.

## Cambios implementados
- Formulario multipaso mobile first con una pregunta por pantalla.
- Barra de progreso, validación por paso y pantalla final de agradecimiento.
- Lógica condicional para contacto por mail y/o WhatsApp.
- Captura de `source`, `utm_*` y `ref`.
- Panel admin con listado, filtros, detalle, notas internas, tags y exportación CSV.
- SQL inicial con tablas:
  - `survey_responses`
  - `beta_candidates`
  - `outbound_events`
  - `admin_users`

## Archivos principales
- `app/`
- `features/survey/`
- `features/admin/`
- `lib/supabase/`
- `supabase/001_initial_schema.sql`
- `README.md`

## Pendientes para la próxima fase
- Conectar envíos reales de agradecimiento y beta.
- Agregar métricas agregadas o dashboard si hace falta.
- Incorporar seeds de prueba o fixtures para demos internas.
