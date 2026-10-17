# Tasks

## 1. Datos comerciales

- [ ] 1.1 Definir contratos para personas, negocios, cuentas, movimientos y contratos; verificar los casos de dos negocios por propietario y referencias inválidas de commercial-data.
- [ ] 1.2 Añadir objetivos, preferencias, facturas, catálogo y elegibilidad simulada; verificar que cada propuesta de factoring pueda referenciar facturas existentes o señalar su ausencia.
- [ ] 1.3 Crear generador y carga local reproducibles; verificar igualdad de registros con igual semilla, fecha y versión y separación de resultados reservados para evaluación.
- [ ] 1.4 Documentar el diccionario, cobertura, supuestos y comando de regeneración; verificar su ejecución desde un entorno preparado según la guía.

## 2. Perfil dinámico

- [ ] 2.1 Consolidar perfil por negocio con evidencia, fechas y estados; verificar que incremento de compras no confirme por sí solo una expansión.
- [ ] 2.2 Calcular indicadores por ventana sin convertir desconocidos en cero; verificar cobertura parcial y moneda de cada indicador.
- [ ] 2.3 Registrar confirmaciones y correcciones como eventos y versiones; verificar conservación del valor anterior, autor y fuente.
- [ ] 2.4 Excluir fuentes no habilitadas y aislar preferencias de la decisión financiera; verificar los dos escenarios de uso permitido de dynamic-profiles.
- [ ] 2.5 Publicar contratos de consulta y actualización del perfil y documentarlos; verificar lectura y corrección mediante el servicio local.

## 3. Especialistas y coordinación

- [ ] 3.1 Implementar comprobaciones versionadas de duplicación, elegibilidad y costos; verificar contrato vigente y contribución no calculable cuando falten costos.
- [ ] 3.2 Crear adaptador de modelo parametrizable y modo simulado identificable; verificar configuración ausente y rechazo de respuestas fuera de contrato.
- [ ] 3.3 Implementar especialistas de cobros, capital de trabajo y factoring; verificar propuestas o descartes estructurados con referencias existentes.
- [ ] 3.4 Añadir revisión en interés del cliente y coordinador; verificar recomendación de cobros sin crédito innecesario, solicitud de información y no ofrecer.
- [ ] 3.5 Registrar herramientas, evidencias, versiones y errores; verificar una traza de proveedor real cuando esté configurado y un registro explícito de simulación cuando no lo esté.
- [ ] 3.6 Documentar configuración del modelo y ejecución de casos; verificar que los pasos produzcan los modos y trazas descritos.

## 4. Mensajes y actualización de recomendaciones

- [ ] 4.1 Conservar mensajes fuente y extraer eventos propuestos; verificar que detalles ausentes no se confirmen automáticamente.
- [ ] 4.2 Confirmar eventos y disparar reevaluación por negocio; verificar que la recomendación anterior se marque desactualizada y el resultado nuevo use el perfil actual.
- [ ] 4.3 Contener respuestas atrasadas y errores de reevaluación; verificar que un resultado para una versión antigua no reemplace al actual.
- [ ] 4.4 Documentar estados y contrato de actualización; verificar el recorrido mensaje, confirmación, perfil nuevo y nuevas propuestas.

## 5. Ficha CRM del asesor

- [ ] 5.1 Construir cartera y ficha de tres columnas según panel-crm-mypes-v1.png; verificar conversación, perfil y agentes del mismo negocio en pantalla de escritorio.
- [ ] 5.2 Añadir evidencia, alternativas y descartes en contexto; verificar navegación sin perder el cliente seleccionado.
- [ ] 5.3 Integrar confirmaciones, correcciones y motivos de rechazo; verificar actualización del perfil y conservación del feedback.
- [ ] 5.4 Mostrar estados de análisis, error y versiones; verificar que información insuficiente no aparezca como oferta aprobada.
- [ ] 5.5 Añadir borradores editables y señales de demo; verificar que ninguna acción envíe mensajes externos o contrate un producto.
- [ ] 5.6 Documentar arranque y uso de la ficha; verificar el guion documentado con una demo local.

## 6. Recorrido integrado

- [ ] 6.1 Ejecutar casos completos de necesidad válida, contrato existente, datos insuficientes y no ofrecer; verificar resultados y evidencia contra los escenarios reservados.
- [ ] 6.2 Demostrar cambio de recomendación tras un pedido confirmado; verificar la cadena de mensajes, versiones y propuestas sin mezclar clientes.
- [ ] 6.3 Registrar resultados de verificación por capacidad y límites de la demo; verificar correspondencia con los escenarios OpenSpec sin afirmar uplift comercial real.

## Workflow follow-up

- Revisar propuesta, requisitos y diseño antes de aplicar el cambio.
- Archivar solo después de completar implementación y verificación; conservar tareas pendientes visibles hasta entonces.
