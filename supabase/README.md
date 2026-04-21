# Supabase

## Archivos incluidos
- `001_initial_schema.sql`: esquema inicial, índices, triggers y políticas RLS.

## Cómo aplicarlo
1. Crear el proyecto en Supabase.
2. Cargar las variables del archivo `.env.example`.
3. Ejecutar el contenido de `001_initial_schema.sql` en el SQL Editor o convertirlo en migración.
4. Crear usuarios admin en **Auth > Users**.
5. Insertar cada admin habilitado en `public.admin_users` con su `user_id`, `email` y `role`.

## Notas de acceso
- El formulario público escribe por endpoint server-side usando `SUPABASE_SERVICE_ROLE_KEY`.
- El panel admin lee y actualiza usando sesión autenticada + RLS.
- No hay alta pública de admins en esta versión.
