# Backend Mype360 y Supabase

Base de autenticación sobre Node.js 22+, `@supabase/server` 1.9.2 y `@supabase/supabase-js` 2.118.0. Supabase se usará para Postgres y Auth; esta entrega no crea todavía las tablas comerciales.

## Entorno y arranque

Desde la raíz del repositorio:

```bash
npm ci
cp .env.example .env
# Completar SUPABASE_PUBLISHABLE_KEY con la clave del proyecto.
npm run backend:test
npm run supabase:check
npm run backend:dev
```

En el equipo de preparación ya se creó `.env` con la URL, publishable key y JWKS proporcionados; no sobrescribirla al repetir los pasos. `.env` está excluida de Git y tiene permisos locales restringidos. La plantilla versionada no contiene secretos.

- `SUPABASE_URL`: raíz HTTPS del proyecto.
- `SUPABASE_PUBLISHABLE_KEY`: clave pública del proyecto; no identifica a un usuario.
- `SUPABASE_JWKS_URL`: claves públicas para verificar JWT, del mismo proyecto.
- `SUPABASE_SECRET_KEY`: reservada para futuras operaciones administrativas. Se recibió enmascarada y quedó vacía; la sesión implementada no la utiliza.
- `BACKEND_PORT`: 8787 por defecto; el servicio escucha únicamente en `127.0.0.1`.

## Endpoints implementados

- `GET /health`: estado del proceso local, sin datos de clientes ni claves. No es una prueba de conexión a la base de datos.
- `GET /api/session`: exige `Authorization: Bearer <JWT de Supabase Auth>`. Verifica firma, emisor, audiencia y una identidad no anónima con rol `authenticated`. Devuelve únicamente identificador y rol. No devuelve tokens ni claves y desactiva caché.

La autenticación usa `verifyAuth` y `createContextClient`. No se crea un cliente administrativo ni se exponen rutas de administración. Los futuros endpoints deberán comprobar además la asignación del asesor al negocio mediante RLS; una sesión válida por sí sola no autoriza acceso a cualquier mype. No existe todavía pantalla de login ni una sesión de asesor real de prueba.

La base se entrega como módulos JavaScript ESM ejecutables directamente; no requiere un paso de compilación TypeScript. La interfaz del asesor y los agentes comerciales siguen pendientes en OpenSpec.

## Verificación

`npm run backend:test` prueba tokens RSA locales: aceptados, vencidos, emisor/audiencia incorrectos, firma no confiable, usuarios anónimos y credenciales ausentes. No crea usuarios remotos.

`npm run supabase:check` consulta únicamente JWKS y la configuración pública de Auth. No imprime claves ni datos de usuario. En la preparación ambos respondieron HTTP 200 y JWKS publicó una clave. Esto no valida migraciones, políticas RLS ni consultas comerciales.

## MCP de Supabase para Codex

El MCP se registró en la configuración local de Codex para el proyecto `hbpwibthtoernsejaulg`, con las funciones solicitadas. Esa configuración y los tokens OAuth no se almacenan en Git.

Para configurar otro equipo:

```bash
codex mcp add supabase --url 'https://mcp.supabase.com/mcp?project_ref=hbpwibthtoernsejaulg&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching'
# Si add no completó OAuth:
codex mcp login supabase
codex mcp list
```

El primer registro completó OAuth y la lista de la CLI muestra `supabase` habilitado con OAuth. Las herramientas nuevas no están disponibles en la conversación que ya estaba abierta; recargar la sesión y consultar `/mcp` en Codex para verlas.

Se instalaron en `.agents/skills/` las skills oficiales `supabase-server`, `supabase` y `supabase-postgres-best-practices`. Estarán disponibles en el siguiente turno o al recargar el entorno, según la detección de skills de Codex.

## Próximo paso

Definir las tablas comerciales y las políticas por asesor/negocio, generar la migración y cargar datos sintéticos. No se han ejecutado escrituras ni migraciones remotas en esta entrega.

Referencias: [Supabase Server](https://supabase.com/docs/reference/server), [variables de entorno](https://github.com/supabase/server/blob/main/docs/environment-variables.md), [MCP de Codex](https://developers.openai.com/codex/mcp/).
