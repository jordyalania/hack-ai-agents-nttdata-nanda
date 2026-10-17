# CrossPilot — resumen actual del producto y la BD

Actualización: 17 de octubre de 2026. El producto se llama **CrossPilot** y la web principal está basada en el ZIP `Prototipo interactivo Crosspilot.zip` aportado por el usuario.

## Dónde está la base

[Proyecto Supabase](https://supabase.com/dashboard/project/hbpwibthtoernsejaulg) · [Ver tablas](https://supabase.com/dashboard/project/hbpwibthtoernsejaulg/editor)

- Proyecto: `hbpwibthtoernsejaulg`.
- API: `https://hbpwibthtoernsejaulg.supabase.co`.
- Postgres: `db.hbpwibthtoernsejaulg.supabase.co:5432`, base y usuario `postgres`.
- La conexión directa requiere contraseña privada. La web utiliza publishable key y sesión de usuario; no expone credenciales administrativas.

**Tabla activa de la nueva web:** `public.crosspilot_workspaces`. Reúne el estado completo del prototipo en un JSON por asesor, con `owner_id`, `state`, `revision` y `updated_at`. No hay una BD por agente.

**Cartera beta del Excel:** ya cargada en el mismo Supabase, con cuatro tablas adicionales: `crosspilot_datasets`, `crosspilot_dataset_clients`, `crosspilot_dataset_products` y `crosspilot_source_records`. Contiene 10 empresas cliente, 311 movimientos, 24 leads, 31 contratos y un catálogo de 24 productos (8 activos en origen y 16 propuestos), con 847 filas fuente conservadas. El libro declara todo sintético. La pestaña **Cartera beta · Supabase** consulta estos datos sin login, con RLS de solo lectura para snapshots sintéticas; las carteras de asesores siguen privadas. No aplica las reglas incompatibles del ZIP ni convierte leads en aprobaciones. Ver [diferencias, firma de datos, relaciones y reproducción](base-web/docs/INTEGRACION-CARTERA-BETA.md).

Las once tablas `mype_*` de la fase anterior permanecen en el mismo proyecto por compatibilidad. No se borraron ni renombraron y la nueva ruta no guarda en ellas. Las migraciones y sus pruebas están en `base-web/supabase/`.

## Qué guarda CrossPilot

| Dato | Contenido |
| --- | --- |
| Clientes | Diez MYPES sintéticas del prototipo, de Rosa Huamán a Raúl Chávez |
| Perfil | Ingreso neto, deuda, mora, productos y señales comerciales |
| Negociación | Mensajes predefinidos de Orquestador, Venta cruzada y Riesgo |
| Aprobación | Productos incluidos, montos editados y decisión del ejecutivo |
| Ficha | Resumen, oferta, puntos de conversación, objeciones y próximo paso |
| Postvisita | Nota, resultado confirmado, productos aceptados simulados y seguimiento |
| Estado | Estadísticas, selección, fase y revisión de guardado |

Los gráficos de 24 meses y porcentajes de afinidad son ilustrativos. No representan una consulta a SBS ni un modelo calibrado. IBM AML y SAML-D no alimentan esta web.

## Cómo guardar

La demo inicial se guarda en el navegador con la clave `crosspilot-workspace-v1`. **No se sube automáticamente a Supabase.**

En la web: **Conectar Supabase → iniciar sesión o crear acceso → Cargar mi cartera → Guardar cambios**. Cargar una cartera remota no importa las modificaciones locales. Exportar descarga `crosspilot-cartera.json`; todavía no existe importador.

La RPC `crosspilot_save_workspace(document, expected_revision)` guarda con control de revisión. RLS impide ver o modificar carteras de otro asesor y bloquea acceso anónimo. Las pruebas remotas usan usuarios ficticios transaccionales, sin emails y con rollback; no crean carteras permanentes.

## Qué hace la web

1. Agenda de cinco clientes priorizados de una cartera de diez; selector de todos los clientes.
2. Perfil lateral con gráficos, trayectoria, productos e intereses.
3. Negociación entre agentes simulados y revisión de riesgo.
4. Edición de montos, inclusión de productos y aprobación o rechazo humano.
5. Ficha de visita y postvisita con resultado explícito.
6. Guardado local, exportación y cartera privada en Supabase.

Catálogo actual: capital de trabajo, activo fijo, seguro de negocio, ahorro y cobro QR. En el ejemplo de Rosa, Riesgo ajusta activo fijo de S/20,000 a S/12,000. Las reglas, puntajes y márgenes son supuestos de demostración, no decisiones reales de crédito ni rentabilidad medida.

El resultado de una nota no se presupone como aceptado: el asesor debe confirmarlo. Solo una aceptación explícita incrementa los productos **sintéticos** de la sesión. No se contratan ni activan servicios reales.

## Código y ejecución

| Elemento | Dónde está |
| --- | --- |
| Web | [`base-web/`](base-web/README.md) — TanStack Start, React y TypeScript |
| Fuente del ZIP | `referencias/crosspilot-design/` y copia en `base-web/design-source/` |
| Conversor reproducible | `base-web/scripts/convert-crosspilot.py` |
| React del prototipo | `base-web/src/components/crosspilot/CrossPilotPrototype.jsx` |
| Auth y entorno | `base-web/src/components/crosspilot/CrossPilotApp.tsx` |
| Estado y persistencia | `crosspilot-session.ts`, `use-crosspilot.ts`, `crosspilot-repository.ts` |
| Esquema actual | `20261017201853_crosspilot_prototype_workspace.sql` |
| Guía de integración | [CrossPilot prototipo](base-web/docs/CROSSPILOT-PROTOTIPO.md) |

[Repositorio web](https://github.com/jordyalania/mype-connect) — privado y sincronizado con Lovable. [Repositorio principal](https://github.com/jordyalania/hack-ai-agents-nttdata-nanda) — público. Se conserva la URL `mype-connect` para no romper la integración; la marca del producto ya es CrossPilot.

```sh
git submodule update --init base-web
npm ci
npm --prefix base-web ci
npm run web:dev -- --host 127.0.0.1 --port 5173
```

[Vista local](http://127.0.0.1:5173), mientras el servidor esté ejecutándose. Los pushes se sincronizan con el editor Lovable; no confirman por sí solos publicación pública.

## Qué falta para producción

Proveedor de IA real, fuentes comerciales autorizadas, políticas y condiciones bancarias validadas, importación de datos anteriores si se desea, y publicación del entorno. El nuevo prototipo no invoca el adaptador narrativo opcional del backend anterior.

No están conectados voz, WhatsApp, envío de ofertas, contratación, desembolsos, datos privados de BCP ni scoring crediticio real. Ambos estados del “Modo respaldo” usan respuestas predefinidas.
