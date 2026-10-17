# Hack AI Agents — Base de la hackatón

> Base organizada a partir del material proporcionado por el usuario. Los datasets y sus características se reproducen según ese material; sus enlaces, licencias y disponibilidad están pendientes de verificación.

NTT DATA + Sundai LATAM + NANDA Project MIT Media Lab | Perú Tech Week | 17 de octubre

Este archivo reúne los retos, los datos sugeridos y los criterios de evaluación para explorar y desarrollar el proyecto desde esta carpeta principal.

## Índice

- [Banca](#banca): B1 · Investigación de alertas AML; B2 · Normativa y políticas internas; B3 · Cobranza temprana.
- [Minería](#minería): M1 · Seguridad y riesgos dinámicos; M2 · Confiabilidad de equipos; M3 · Cumplimiento ambiental.
- [Manufactura](#manufactura): I1 · Eficiencia energética; I2 · Producción continua; I3 · Cadena de suministro; I4 · Mantenimiento industrial.
- [Criterios de evaluación](#criterios-de-evaluación).
- [Exploración del proyecto](#exploración-del-proyecto).

## Banca

### B1. Investigación de alertas AML

**El problema:** Información dispersa y alto trabajo manual dificultan investigar alertas con rapidez, consistencia y trazabilidad. Cada alerta generada por el sistema de monitoreo transaccional requiere que un analista reconstruya manualmente el contexto del cliente: historial de transacciones, contrapartes, señales de riesgo, y normativa aplicable, antes de decidir si se descarta o se reporta.

**Por qué importa:** El tiempo de investigación por alerta es el cuello de botella típico de los equipos AML. Más volumen de alertas no significa más analistas disponibles — significa backlog, fatiga de alertas, y riesgo regulatorio si una alerta real se cierra sin la debida diligencia.

**Posible enfoque con agentes de IA:** Un agente que, dada una alerta, reconstruya automáticamente el caso: arma el perfil transaccional del cliente, identifica patrones típicos de lavado (estructuración, layering, transacciones circulares), cruza contra listas de riesgo, y genera un resumen con recomendación (descartar / escalar) y su justificación trazable para que el analista valide en vez de investigar desde cero.

**Datos sugeridos (Kaggle):**

- IBM Transactions for Anti-Money Laundering (AML) — transacciones sintéticas etiquetadas como lavado o no, con bancos emisores/receptores, montos y tipo de pago. Buen punto de partida, con mucho volumen (seis sub-datasets HI/LI).

- Synthetic Transaction Monitoring Dataset (SAML-D) — más granular: 9.5M transacciones con 11 tipologías normales y 17 sospechosas, más estructuras de red/grafo entre cuentas. Útil si el equipo quiere ir más allá de clasificación simple y mostrar razonamiento sobre el patrón detectado.

### B2. Normativa y políticas internas

**El problema:** Encontrar la información correcta y vigente entre múltiples documentos puede ser lento y generar interpretaciones inconsistentes. Las políticas de riesgo, circulares normativas y procedimientos internos viven dispersos en distintos documentos, versiones y áreas — cuando un analista necesita resolver una duda normativa rápido, termina preguntando a un colega o revisando PDFs largos.

**Por qué importa:** La inconsistencia en la interpretación normativa es en sí misma un riesgo operativo y regulatorio. Además, cada minuto que un analista pierde buscando la cláusula correcta es tiempo que no está dedicando a evaluar riesgo real.

**Posible enfoque con agentes de IA:** Este caso no depende de un dataset externo — es un problema de RAG (retrieval-augmented generation) sobre documentos propios. El equipo puede construir un agente que indexe un corpus de normativa (puede usarse normativa pública de SBS/Perú como proxy, o documentos sintéticos de ejemplo), responda preguntas citando la fuente exacta, y señale cuándo dos documentos se contradicen o uno está desactualizado.

**Datos sugeridos:** No requiere dataset. Recomendación: armar un corpus de ejemplo con normativa pública de la SBS (Superintendencia de Banca, Seguros y AFP del Perú) o circulares de Basilea III, para que los equipos tengan contenido real sobre el cual construir el RAG sin necesitar documentos internos de BCP. Si el equipo quiere complejidad adicional, puede incluir documentos con fechas de vigencia distintas para probar que el agente detecta versiones obsoletas.

### B3. Cobranza temprana

**El problema:** Detectar una posible mora y definir cuándo, cómo y por qué canal actuar requiere adaptar continuamente la estrategia a cada cliente. Hoy, las campañas de cobranza suelen ser genéricas por segmento, no por comportamiento individual, y se ajustan con retraso frente a señales tempranas de deterioro.

**Por qué importa:** Cuanto antes se detecta una señal de mora inminente, más barato y efectivo es el canal de contacto (una llamada preventiva cuesta menos que una gestión de cobranza judicial). El error de no actuar a tiempo —o de actuar con el canal equivocado— tiene un costo directo en pérdida esperada.

**Posible enfoque con agentes de IA:** Un agente que monitoree señales de comportamiento (uso de línea, pagos mínimos sostenidos, cambios en frecuencia de transacciones), calcule una probabilidad de mora temprana, y recomiende el canal y mensaje óptimo por cliente — ajustando la estrategia según la respuesta observada, en vez de aplicar una campaña fija por segmento.

**Datos sugeridos (Kaggle):**

- Give Me Some Credit — dataset clásico de riesgo de crédito, predice probabilidad de default en los próximos 2 años con variables de comportamiento financiero (uso de línea revolvente, atrasos pasados, ratio deuda-ingreso).

- Loan Default Prediction Dataset — 255K registros con variables demográficas y de comportamiento de pago, más sencillo de procesar en un día de hack.

## Minería

### M1. Seguridad y riesgos dinámicos

**El problema:** Las condiciones operacionales cambian y pueden aparecer riesgos no identificados o controles insuficientes antes de ejecutar una tarea. Los procesos de permisos de trabajo (PTW) y análisis de riesgo suelen basarse en checklists estáticos que no capturan cómo cambian las condiciones reales en el momento de ejecutar la tarea.

**Por qué importa:** En minería, un riesgo no identificado antes de iniciar una tarea puede derivar en un incidente grave. La brecha entre "lo que dice el checklist" y "lo que está pasando ahora" es exactamente el espacio donde ocurren los accidentes prevenibles.

**Posible enfoque con agentes de IA:** Un agente que, a partir de reportes de incidentes pasados (texto libre + variables estructuradas), identifique patrones de riesgo por tipo de tarea, ubicación o turno, y genere alertas o checklists dinámicos antes de autorizar una tarea similar — en vez de depender de un checklist genérico.

**Datos sugeridos (Kaggle):**

- Industrial Safety and Health Analytics Database — 425 incidentes industriales documentados en 12 plantas de Sudamérica, con descripción textual, nivel de riesgo potencial, tipo de accidente y área. Es el dataset más directamente aplicable al caso: real, de la región, y con texto libre para trabajar NLP + clasificación de riesgo.

### M2. Confiabilidad de equipos

**El problema:** Patrones no evidentes pueden anticipar nuevos modos de falla que terminan afectando la disponibilidad y continuidad operacional. El mantenimiento sigue siendo mayormente reactivo o calendarizado, no basado en la condición real del equipo.

**Por qué importa:** Una falla no anticipada en equipo crítico de mina detiene producción, no solo repara. El costo de downtime no planificado suele ser varios órdenes de magnitud mayor que el de una intervención preventiva bien programada.

**Posible enfoque con agentes de IA:** Un agente que monitoree variables de sensores en tiempo (casi) real, detecte anomalías respecto al comportamiento normal del equipo, arme automáticamente la orden de trabajo con el diagnóstico probable, y la priorice contra el calendario de producción — en vez de que un ingeniero revise manualmente dashboards.

**Datos sugeridos (Kaggle):**

- AI4I 2020 Predictive Maintenance Dataset — dataset estándar de la industria para este tipo de problema: variables de sensor (temperatura, torque, velocidad, desgaste de herramienta) con 5 modos de falla etiquetados por separado. Tamaño manejable para un día de hack.

- Predictive Equipment Failures (downhole sensors) — si el equipo quiere un caso más cercano a equipo pesado/industrial con series de sensores más ricas (bins de histograma por sensor).

### M3. Cumplimiento ambiental

**El problema:** El volumen de compromisos, fechas y evidencias dificulta anticipar desviaciones y asegurar el cumplimiento en tiempo y forma. Los compromisos ambientales (monitoreo de agua, aire, ruido, fechas de reporte a la autoridad) viven en documentos y calendarios dispersos.

**Por qué importa:** Un incumplimiento ambiental no detectado a tiempo no es solo una multa — puede escalar a paralización de operaciones y daño reputacional severo en una industria bajo escrutinio público constante.

**Posible enfoque con agentes de IA:** Un agente que cruce datos de monitoreo (simulados o de ejemplo) contra límites regulatorios, identifique desviaciones antes de que se conviertan en incumplimiento, y genere automáticamente el borrador de reporte para la autoridad con la evidencia asociada.

**Datos sugeridos:** No hay un dataset de Kaggle directo y limpio para este caso específico de minería peruana. Recomendaciones:

- Generar un dataset sintético de monitoreo ambiental (lecturas de calidad de agua/aire con timestamps, ubicación y límites regulatorios) — es rápido de crear con un script y le da al equipo control total sobre la narrativa de la demo.

- Como alternativa con datos reales: el EEB Industrial Plant Data Viewer (emisiones industriales europeas, nivel planta) puede servir como proxy de estructura de datos, aunque no es de Kaggle ni específico de minería.

- Vale la pena marcar este caso como el más "armable con datos propios/sintéticos" de los tres de minería.

## Manufactura

### I1. Eficiencia energética

**El problema:** Producción, equipos, horarios y otras variables dificultan explicar consumos energéticos inusuales y sus causas. Cuando el consumo de energía se dispara, identificar qué línea, turno o equipo lo causó suele requerir cruzar varias fuentes manualmente.

**Por qué importa:** La energía es uno de los costos operativos más grandes y más controlables en manufactura — pero solo si se detectan las anomalías a tiempo y se les atribuye una causa raíz accionable, no solo una alerta genérica.

**Posible enfoque con agentes de IA:** Un agente que monitoree el consumo energético por línea/equipo, detecte desviaciones respecto al patrón esperado (ajustado por volumen de producción), y explique la anomalía en lenguaje natural apuntando a la causa más probable (equipo específico, horario, tipo de producto).

**Datos sugeridos (Kaggle):**

- Steel Industry Energy Consumption Dataset — consumo energético real de una planta siderúrgica surcoreana con variables de factor de potencia, CO2, tipo de carga y periodo del día. Es el dataset más usado para este tipo de caso y fácil de trabajar en un día.

### I2. Producción continua

**El problema:** Desbalances entre etapas generan cuellos de botella y tiempos muertos, reduciendo producción y eficiencia. Identificar en qué estación específica de la línea se origina el cuello de botella no siempre es evidente con reportes agregados.

**Por qué importa:** Un cuello de botella no identificado limita la capacidad de toda la línea, aunque el resto de las estaciones tengan capacidad ociosa. Resolver el cuello de botella correcto tiene un efecto multiplicador; resolver el incorrecto no cambia nada.

**Posible enfoque con agentes de IA:** Un agente que analice tiempos de ciclo por estación y producto, identifique automáticamente dónde se concentra el tiempo de espera/cola, y simule el impacto de distintas intervenciones (rebalanceo, capacidad adicional) antes de recomendar una acción.

**Datos sugeridos (Kaggle):**

- Bosch Production Line Performance — dataset real de una línea de ensamblaje con mediciones por estación, línea y fecha. Es grande (puede necesitar muestreo para un día de hack), pero es el estándar de la industria para este tipo de análisis y permite mostrar bien el "dónde" del cuello de botella.

### I3. Cadena de suministro

**El problema:** Retrasos, cambios de demanda y faltantes de inventario pueden interrumpir producción y comprometer pedidos. La visibilidad sobre el riesgo de un retraso suele llegar después de que ya ocurrió, no antes.

**Por qué importa:** Un retraso no anticipado en la cadena de suministro se propaga: afecta producción, cumplimiento de pedidos y satisfacción del cliente. Anticiparlo con unos días de margen permite buscar alternativas (otro proveedor, ajuste de producción) a tiempo.

**Posible enfoque con agentes de IA:** Un agente que, dado un pedido en curso, prediga el riesgo de entrega tardía según variables históricas (modo de envío, método de pago, región, categoría de producto), y recomiende automáticamente una acción preventiva (cambio de transportista, ajuste de fecha comprometida al cliente).

**Datos sugeridos (Kaggle):**

- DataCo Smart Supply Chain for Big Data Analysis — 180,000+ órdenes con información de clientes, productos, envío y logística a nivel global. Incluye una variable de "late delivery risk" ya etiquetada, lo que lo hace directamente aplicable y rápido de usar en un día.

### I4. Mantenimiento industrial

**El problema:** Alarmas, inspecciones y órdenes compiten por atención; una mala priorización puede generar paradas no planificadas. El equipo de mantenimiento recibe más señales de las que puede atender en tiempo real, y priorizar mal cuesta downtime.

**Por qué importa:** No todas las alarmas son iguales — algunas son ruido, otras anticipan una falla crítica. Priorizar mal consume el recurso más escaso (tiempo del técnico) en lo menos importante.

**Posible enfoque con agentes de IA:** Un agente que reciba el flujo de alarmas/órdenes, las clasifique por severidad y probabilidad real de derivar en falla (no solo por regla fija), y genere automáticamente la cola de trabajo priorizada para el equipo de mantenimiento.

**Datos sugeridos (Kaggle):**

- AI4I 2020 Predictive Maintenance Dataset — mismo dataset sugerido para M2 (confiabilidad de equipos en minería); funciona igual de bien aquí ya que el problema de fondo (sensor → probabilidad de falla → priorización) es el mismo patrón aplicado a manufactura.

## Criterios de evaluación

Criterios de Evaluación — Hack Perú Tech Week

Guía para participantes y jurado | 17 de octubre

Cada equipo será evaluado con los mismos 5 criterios, cada uno con el mismo peso (20%). No hay un criterio "más importante" — un buen proyecto necesita destacar en todos, no solo en uno.

### 1. Ejecución (20%)

**Qué se evalúa:** El prototipo funciona y demuestra el flujo en vivo.

No se evalúa la idea en abstracto, se evalúa lo que realmente corre frente al jurado. Es preferible un flujo corto que funcione de principio a fin, a una demo ambiciosa que se cae a la mitad o que se explica con slides en vez de mostrarse. Prioricen tener algo demostrable temprano y sumen features solo si el flujo base ya es estable.

### 2. Aplicación práctica (20%)

**Qué se evalúa:** La solución responde al reto y aporta valor al sector.

Conecten la solución de vuelta al caso original — ¿a quién le resuelve el problema, y qué gana esa persona o equipo al usarla? No se trata de construir algo técnicamente impresionante que no se vincula al reto, sino de que un experto del sector (banca, minería o manufactura) vea la solución y piense "esto sí me ayudaría en mi día a día".

### 3. Experiencia de usuario (20%)

**Qué se evalúa:** La interacción es clara y facilita resolver la tarea.

La mejor solución técnica no sirve si la persona que la usa no entiende qué está pasando o cómo interactuar con ella. No hace falta una interfaz pulida con diseño de producto — hace falta que sea clara: qué hace, cómo se usa, y qué está respondiendo en cada paso.

### 4. Innovación (20%)

**Qué se evalúa:** La propuesta aporta una forma novedosa de resolver el reto.

No busquen novedad por la novedad — busquen un ángulo distinto al obvio. Puede ser la forma de abordar el problema, una combinación inesperada de herramientas, o una interacción que nadie más del hack habrá pensado. Si cinco equipos resuelven el mismo caso de forma casi idéntica, este criterio es el que separa a los que solo ejecutaron del que además pensó distinto.

### 5. Uso de AI inmerso en la solución (20%)

**Qué se evalúa:** Qué tan bien está integrado el uso de agentes de IA en el corazón de la solución, no como un agregado superficial.

La IA no debería ser un detalle decorativo (un chatbot pegado encima de una app normal) — debería ser el motor que resuelve la parte difícil del problema. Explíquenle al jurado qué está haciendo el agente, por qué esa decisión de diseño tiene sentido para el caso, y qué tan autónomo es su razonamiento o su flujo de acción. No se espera una arquitectura compleja en un día de hack — se espera que el uso de IA esté bien pensado y claramente demostrado.

## Exploración del proyecto

### Decisiones pendientes

- [ ] Elegir sector y caso de uso.
- [ ] Definir el usuario objetivo y el resultado concreto que necesita.
- [ ] Verificar la fuente, licencia, tamaño y variables del dataset o corpus elegido.
- [ ] Delimitar un flujo de demo que funcione de principio a fin.
- [ ] Definir qué tarea resuelve el agente, qué herramientas utiliza y dónde interviene una persona.
- [ ] Establecer una métrica de valor y preparar ejemplos reproducibles.
- [ ] Preparar la demostración considerando los cinco criterios con igual peso.

### Recursos locales

- [LEEME-NANDATOWN.md](LEEME-NANDATOWN.md): preparación y descripción del entorno NandaTown disponible en esta carpeta.
- [nandatown/README.md](nandatown/README.md): documentación del repositorio local.

NandaTown es un recurso local disponible para explorar. El material base no establece que su uso sea obligatorio.

### Ficha para completar al elegir el reto

| Campo | Definición |
| --- | --- |
| Caso elegido | Pendiente |
| Usuario objetivo | Pendiente |
| Problema y valor esperado | Pendiente |
| Dataset o corpus | Pendiente |
| Flujo del agente y herramientas | Pendiente |
| Validación humana | Pendiente |
| Alcance del prototipo | Pendiente |
| Métrica de éxito | Pendiente |
| Guion de demo | Pendiente |
