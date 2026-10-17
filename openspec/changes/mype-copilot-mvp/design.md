# Design

## Context

El repositorio contiene brief, análisis comercial, scripts de datos AML y un submódulo NandaTown. La base de Lovable vive en el submódulo `base-web` (TanStack Start/React). Se implementan la ficha CrossPilot, endpoints comerciales y persistencia Supabase. El proveedor de modelo sigue opcional y sin credenciales configuradas. Se incorpora la base de autenticación Supabase en Node.js. Ver `proposal.md` para motivación y alcance. La referencia visual es `visualizaciones/panel-crm-mypes-v1.png`: una ficha con perfil, conversación y propuestas de producto; es un concepto gráfico, no código ejecutable.

## Goals / Non-Goals

**Goals:** recorrer una recomendación completa con datos sintéticos, actualizarla tras un cambio y permitir revisar sus evidencias y alternativas.

**Non-Goals:** arquitectura distribuida de producción, integración bancaria, mensajería externa, aprendizaje de conversión sobre etiquetas inventadas y autorización crediticia real.

## Decisions

1. **Componentes independientes del submódulo.** Se reutiliza `base-web/` con TanStack Start/React/TypeScript, conservando la sincronización de Lovable, y `services/backend/` con Node.js 22.18+ y `@supabase/server`. El dominio TypeScript reside en `base-web/src/domain/` y se comparte con el backend local. Supabase Postgres sustituye SQLite como persistencia prevista; contratos JSON validan los intercambios. La orquestación del copiloto se implementará sobre esta API sin exigir un segundo servicio Python. Se evita adaptar la web de NandaTown porque tiene otro propósito y ciclo de actualización.

2. **Datos relacionales y evidencia.** Separar personas, negocios, titularidad, cuentas, movimientos, contratos, objetivos, preferencias, facturas, catálogo y elegibilidad. Observaciones y confirmaciones se añaden como eventos; snapshots numerados permiten leer perfiles. Los resultados esperados para evaluación viven fuera de las herramientas de agentes. El generador fija semilla, referencia temporal y escenario. Esto facilita corrección y reproducción frente a sobrescribir una única ficha sin historial.

3. **Orquestación explícita en un servicio.** Un coordinador invoca especialistas y revisión del cliente mediante contratos estructurados y herramientas de lectura limitadas al negocio. El adaptador de modelo se configura por entorno; un modo simulado independiente permite probar el flujo y siempre se identifica. Para demostrar IA se requiere una ejecución registrada con proveedor real. No es necesario desplegar cada especialista como un microservicio. NandaTown queda disponible para experimentar con cooperación más adelante.

4. **Economía y elegibilidad deterministas.** Funciones versionadas verifican condiciones, duplicaciones, evidencia y costos; los agentes explican y contrastan, pero no reescriben reglas financieras. Las preferencias afectan comunicación. Costos desconocidos producen valor no calculable, no cero.

5. **Actualización tras eventos.** Registrar un mensaje conserva su texto; la extracción propone eventos y preguntas. Un evento confirmado incrementa la versión y marca la recomendación previa como desactualizada. El controlador local serializa y reemplaza la reevaluación pendiente; la aceptación del resultado exige coincidencia de perfil y contexto. Cada respuesta lleva versión de perfil, catálogo y reglas; la interfaz descarta resultados que llegan para una versión superada. El cálculo por reglas es local; el guardado y la recarga remotos son explícitos. No hay infraestructura de streaming en el MVP.

6. **Ficha única y revisión humana.** Cartera y ficha de tres columnas: perfil a la izquierda, conversación al centro y especialistas/coordinador a la derecha. Evidencias y descartes se abren en contexto. Se ofrecen borradores, confirmación y corrección; los controles no envían mensajes externos.

7. **Autenticación y datos.** La base incorpora `/health` local y `/api/session` protegido por JWT, con cliente de usuario sujeto a RLS. Once tablas `mype_*` y una función transaccional guardan carteras y sus proyecciones relacionales con RLS por asesor, referencias compuestas y revisión optimista. La publishable key no autentica a un usuario. La clave secreta permanece solo en el entorno servidor y no es necesaria para consultar la sesión. La instrucción posterior del usuario autoriza crear la base y aplicar migraciones. La migración `20261017191922` se aplicó y verificó mediante la CLI oficial contra el proyecto indicado; las pruebas remotas se revierten al terminar.

8. **Modo local de demo.** Modo local separado del modo Supabase autenticado, siempre con datos exclusivamente sintéticos. El guardado remoto es explícito y rechaza revisiones antiguas. Los endpoints y la interfaz identifican ese modo. No se presenta como un CRM multiusuario con controles de producción ya implementados.

## Risks / Trade-offs

- Hipótesis tratada como certeza → estado explícito y confirmación con fuente antes de decisiones que la requieran.
- Respuestas no estructuradas del modelo → validación de contrato y referencias; propuesta fallida queda descartada con motivo.
- Datos coherentes solo en apariencia → integridad referencial, escenarios controlados y casos de ausencia de información.
- Resultado que llega tarde → comprobación de versiones y marca visible de desactualización.
- Alcance amplio para hackatón → primero datos y perfil, luego un recorrido de recomendación, después los tres especialistas y la interfaz integrada.
- Confusión entre simulación y beneficio real → métricas de funcionamiento y trazabilidad; validación comercial posterior separada.

## Migration Plan

Añadir módulos nuevos sin alterar los lanzadores ni el submódulo. Un comando genera y carga la base sintética; otro reinicia la demo. Conservar un dataset fijo para reproducir la presentación. El rollback detiene los servicios nuevos y conserva el material previo; no hay migración de clientes reales.

## Implementation references · 2026-10-17

- `base-web/README.md`: arranque, login y guion completo.
- `base-web/docs/DATOS-Y-ARQUITECTURA.md`: contratos, esquema relacional, generación y políticas.
- `base-web/docs/VERIFICACION.md`: pruebas y límites; no se atribuye una ejecución real a los tests de modelo.
- La PPT se refleja en cinco roles de producto: Orquestador, Cross-sell (tres especialistas), Riesgo, Visita y Postvisita. El coordinador también revisa interés del cliente.

## CrossPilot · actualización solicitada

El usuario sustituye la base visual por `Prototipo interactivo Crosspilot.zip`, un export Claude Design con plantilla `sc-if`/`sc-for` y lógica sintética predefinida. Se extrae a `referencias/crosspilot-design` y se conserva una copia fuente en el frontend. Un conversor de desarrollo genera JSX nativo: no se evalúa texto ni se depende del `support.js` ausente. El nuevo catálogo y escenarios del prototipo son la referencia de la ruta principal. La lógica y tablas de la fase anterior se conservan por compatibilidad; el estado de CrossPilot dispone de persistencia propia, aislada por asesor, en el mismo proyecto Supabase. La UI identifica simulación y pide un resultado de visita explícito antes de actualizar productos sintéticos. El cambio de marca no implica renombrar repositorios, tablas históricas ni claves de configuración privadas.
