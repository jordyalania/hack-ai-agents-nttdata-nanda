# Tasks

## 0. Base Supabase solicitada

- [x] 0.1 Instalar @supabase/server y supabase-js fijados y configurar Node.js 22+; verificar instalación e importaciones.
- [x] 0.2 Preparar entorno privado y plantilla pública sin secretos; verificar exclusión Git y validación de configuración.
- [x] 0.3 Crear backend local con sesión protegida por JWT; verificar tokens válidos, inválidos y ausentes sin acceso administrativo.
- [x] 0.4 Añadir comprobación de conectividad de solo lectura y guía; verificar respuestas de Auth/JWKS o registrar el error real sin afirmar conexión.


## 1. Datos comerciales

- [x] 1.1 Definir contratos para personas, negocios, cuentas, movimientos y contratos; verificar los casos de dos negocios por propietario y referencias inválidas de commercial-data.
- [x] 1.2 Añadir objetivos, preferencias, facturas, catálogo y elegibilidad simulada; verificar que cada propuesta de factoring pueda referenciar facturas existentes o señalar su ausencia.
- [x] 1.3 Crear generador y carga local reproducibles; verificar igualdad de registros con igual semilla, fecha y versión y separación de resultados reservados para evaluación.
- [x] 1.4 Documentar el diccionario, cobertura, supuestos y comando de regeneración; verificar su ejecución desde un entorno preparado según la guía.

## 2. Perfil dinámico

- [x] 2.1 Consolidar perfil por negocio con evidencia, fechas y estados; verificar que incremento de compras no confirme por sí solo una expansión.
- [x] 2.2 Calcular indicadores por ventana sin convertir desconocidos en cero; verificar cobertura parcial y moneda de cada indicador.
- [x] 2.3 Registrar confirmaciones y correcciones como eventos y versiones; verificar conservación del valor anterior, autor y fuente.
- [x] 2.4 Excluir fuentes no habilitadas y aislar preferencias de la decisión financiera; verificar los dos escenarios de uso permitido de dynamic-profiles.
- [x] 2.5 Publicar contratos de consulta y actualización del perfil y documentarlos; verificar lectura y corrección mediante el servicio local.

## 3. Especialistas y coordinación

- [x] 3.1 Implementar comprobaciones versionadas de duplicación, elegibilidad y costos; verificar contrato vigente y contribución no calculable cuando falten costos.
- [x] 3.2 Crear adaptador de modelo parametrizable y modo simulado identificable; verificar configuración ausente y rechazo de respuestas fuera de contrato.
- [x] 3.3 Implementar especialistas de cobros, capital de trabajo y factoring; verificar propuestas o descartes estructurados con referencias existentes.
- [x] 3.4 Añadir revisión en interés del cliente y coordinador; verificar recomendación de cobros sin crédito innecesario, solicitud de información y no ofrecer.
- [x] 3.5 Registrar herramientas, evidencias, versiones y errores; verificar una traza de proveedor real cuando esté configurado y un registro explícito de simulación cuando no lo esté.
- [x] 3.6 Documentar configuración del modelo y ejecución de casos; verificar que los pasos produzcan los modos y trazas descritos.

## 4. Mensajes y actualización de recomendaciones

- [x] 4.1 Conservar mensajes fuente y extraer eventos propuestos; verificar que detalles ausentes no se confirmen automáticamente.
- [x] 4.2 Confirmar eventos y disparar reevaluación por negocio; verificar que la recomendación anterior se marque desactualizada y el resultado nuevo use el perfil actual.
- [x] 4.3 Contener respuestas atrasadas y errores de reevaluación; verificar que un resultado para una versión antigua no reemplace al actual.
- [x] 4.4 Documentar estados y contrato de actualización; verificar el recorrido mensaje, confirmación, perfil nuevo y nuevas propuestas.

## 5. Ficha CRM del asesor

- [x] 5.1 Construir cartera y ficha de tres columnas según panel-crm-mypes-v1.png; verificar conversación, perfil y agentes del mismo negocio en pantalla de escritorio.
- [x] 5.2 Añadir evidencia, alternativas y descartes en contexto; verificar navegación sin perder el cliente seleccionado.
- [x] 5.3 Integrar confirmaciones, correcciones y motivos de rechazo; verificar actualización del perfil y conservación del feedback.
- [x] 5.4 Mostrar estados de análisis, error y versiones; verificar que información insuficiente no aparezca como oferta aprobada.
- [x] 5.5 Añadir borradores editables y señales de demo; verificar que ninguna acción envíe mensajes externos o contrate un producto.
- [x] 5.6 Documentar arranque y uso de la ficha; verificar el guion documentado con una demo local.

## 6. Recorrido integrado

- [x] 6.1 Ejecutar casos completos de necesidad válida, contrato existente, datos insuficientes y no ofrecer; verificar resultados y evidencia contra los escenarios reservados.
- [x] 6.2 Demostrar cambio de recomendación tras un pedido confirmado; verificar la cadena de mensajes, versiones y propuestas sin mezclar clientes.
- [x] 6.3 Registrar resultados de verificación por capacidad y límites de la demo; verificar correspondencia con los escenarios OpenSpec sin afirmar uplift comercial real.

## Workflow follow-up

- Revisar propuesta, requisitos y diseño antes de aplicar el cambio.
- Archivar solo después de completar implementación y verificación; conservar tareas pendientes visibles hasta entonces.

## 7. CrossPilot y prototipo aportado por el usuario

- [x] 7.1 Extraer el ZIP de forma segura y adaptar su plantilla Claude Design a React sin depender de support.js; verificar agenda, perfil y negociación.
- [x] 7.2 Cambiar la marca visible y documentación a CrossPilot, conservando identificadores históricos necesarios para compatibilidad y sin renombrar repositorios externos.
- [x] 7.3 Integrar persistencia del nuevo estado con Supabase Auth, RLS y revisión optimista; verificar guardado, aislamiento y recuperación local.
- [x] 7.4 Verificar aprobación, edición de montos, ficha, rechazo y postvisita con resultado explícito; comprobar errores, reinicio y adaptación móvil.
- [x] 7.5 Actualizar documentación, ejecutar checks y subir ambos repositorios sin reescribir el historial de Lovable.

## 8. Cartera beta y catálogo del Excel

- [x] 8.1 Comparar el Excel con los contratos actuales y crear importación reproducible, validando referencias, conciliación, métricas y procedencia.
- [x] 8.2 Añadir y cargar tablas adicionales en Supabase sin modificar carteras privadas; verificar integridad, conteos, lectura y restricciones de escritura.
- [x] 8.3 Integrar una vista de cartera beta con la firma del prototipo, detalle relacionado y catálogo; distinguir políticas y productos no equivalentes y verificar pruebas y vista móvil.
- [x] 8.4 Documentar diferencias, límites y reproducción, ejecutar comprobaciones y publicar código en ambos repositorios.
