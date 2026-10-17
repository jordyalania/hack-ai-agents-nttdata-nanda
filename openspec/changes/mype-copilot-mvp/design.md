# Design

## Context

El repositorio contiene brief, análisis comercial, scripts de datos AML y un submódulo NandaTown. No hay todavía aplicación Mype360, endpoints comerciales ni proveedor de modelo conectado. Se incorpora la base de autenticación Supabase en Node.js. Ver `proposal.md` para motivación y alcance. La referencia visual es `visualizaciones/panel-crm-mypes-v1.png`: una ficha con perfil, conversación y propuestas de producto; es un concepto gráfico, no código ejecutable.

## Goals / Non-Goals

**Goals:** recorrer una recomendación completa con datos sintéticos, actualizarla tras un cambio y permitir revisar sus evidencias y alternativas.

**Non-Goals:** arquitectura distribuida de producción, integración bancaria, mensajería externa, aprendizaje de conversión sobre etiquetas inventadas y autorización crediticia real.

## Decisions

1. **Componentes independientes del submódulo.** Se propone `apps/advisor/` con Next.js/TypeScript y se prepara `services/backend/` con Node.js 22+ y `@supabase/server`. Supabase Postgres sustituye SQLite como persistencia prevista; contratos JSON validan los intercambios. La orquestación del copiloto se implementará sobre esta API sin exigir un segundo servicio Python. Se evita adaptar la web de NandaTown porque tiene otro propósito y ciclo de actualización.

2. **Datos relacionales y evidencia.** Separar personas, negocios, titularidad, cuentas, movimientos, contratos, objetivos, preferencias, facturas, catálogo y elegibilidad. Observaciones y confirmaciones se añaden como eventos; snapshots numerados permiten leer perfiles. Los resultados esperados para evaluación viven fuera de las herramientas de agentes. El generador fija semilla, referencia temporal y escenario. Esto facilita corrección y reproducción frente a sobrescribir una única ficha sin historial.

3. **Orquestación explícita en un servicio.** Un coordinador invoca especialistas y revisión del cliente mediante contratos estructurados y herramientas de lectura limitadas al negocio. El adaptador de modelo se configura por entorno; un modo simulado independiente permite probar el flujo y siempre se identifica. Para demostrar IA se requiere una ejecución registrada con proveedor real. No es necesario desplegar cada especialista como un microservicio. NandaTown queda disponible para experimentar con cooperación más adelante.

4. **Economía y elegibilidad deterministas.** Funciones versionadas verifican condiciones, duplicaciones, evidencia y costos; los agentes explican y contrastan, pero no reescriben reglas financieras. Las preferencias afectan comunicación. Costos desconocidos producen valor no calculable, no cero.

5. **Actualización tras eventos.** Registrar un mensaje conserva su texto; la extracción propone eventos y preguntas. Un evento confirmado incrementa la versión y marca la recomendación previa como desactualizada. Una cola local serializa reevaluaciones por negocio. Cada respuesta lleva versión de perfil, catálogo y reglas; la interfaz descarta resultados que llegan para una versión superada. Se prefiere consulta periódica del estado a infraestructura de streaming en el MVP.

6. **Ficha única y revisión humana.** Cartera y ficha de tres columnas: perfil a la izquierda, conversación al centro y especialistas/coordinador a la derecha. Evidencias y descartes se abren en contexto. Se ofrecen borradores, confirmación y corrección; los controles no envían mensajes externos.

7. **Autenticación y datos.** La base incorpora `/health` local y `/api/session` protegido por JWT, con cliente de usuario sujeto a RLS. Las futuras tablas requieren migraciones y políticas por asesor/negocio antes de exponer datos. La publishable key no autentica a un usuario. La clave secreta permanece solo en el entorno servidor y no es necesaria para consultar la sesión. No se crean tablas ni se ejecutan migraciones remotas en esta fase.

8. **Modo local de demo.** Un único asesor de demostración y datos exclusivamente sintéticos. Los endpoints y la interfaz identifican ese modo. No se presenta como un CRM multiusuario con controles de producción ya implementados.

## Risks / Trade-offs

- Hipótesis tratada como certeza → estado explícito y confirmación con fuente antes de decisiones que la requieran.
- Respuestas no estructuradas del modelo → validación de contrato y referencias; propuesta fallida queda descartada con motivo.
- Datos coherentes solo en apariencia → integridad referencial, escenarios controlados y casos de ausencia de información.
- Resultado que llega tarde → comprobación de versiones y marca visible de desactualización.
- Alcance amplio para hackatón → primero datos y perfil, luego un recorrido de recomendación, después los tres especialistas y la interfaz integrada.
- Confusión entre simulación y beneficio real → métricas de funcionamiento y trazabilidad; validación comercial posterior separada.

## Migration Plan

Añadir módulos nuevos sin alterar los lanzadores ni el submódulo. Un comando genera y carga la base sintética; otro reinicia la demo. Conservar un dataset fijo para reproducir la presentación. El rollback detiene los servicios nuevos y conserva el material previo; no hay migración de clientes reales.
