# Brief: copiloto de crecimiento y venta consultiva para mypes

Fecha: 17 de octubre de 2026. Mercado: Perú. Banco de referencia: BCP. Nombre de trabajo: Mype360. Estado: propuesta conceptual para hackatón; no describe una integración existente con el banco.

## 1. Visión

Crear un copiloto que ayude al asesor bancario a conocer a cada mype como una relación que evoluciona: entender su negocio, sus necesidades, cómo toma decisiones y qué cambió desde el último contacto. Varios agentes especialistas proponen soluciones y un coordinador selecciona las más adecuadas con evidencia revisable.

La personalización abarca qué proponer, cuándo conversar, qué información confirmar y cómo explicar la oferta. El objetivo es que el cliente obtenga valor, utilice los productos que contrata y encuentre en el banco un aliado para crecer. La fidelización, la venta cruzada y la contribución incremental son resultados a medir, no efectos garantizados.

## 2. Problema y usuarios

El asesor dispone de movimientos, productos y notas dispersas, pero no de una visión actualizada que explique quién es el negocio, qué necesita ahora y cuál es la mejor siguiente acción. Una campaña general puede llegar en un momento inadecuado, repetir productos existentes o confundir una dificultad operativa con una necesidad de crédito.

Usuario principal: asesor de una cartera de mypes. Beneficiarios: emprendedor y empresa. Otros usuarios: supervisor comercial y responsables de producto, quienes revisan resultados agregados y reglas vigentes.

Segmento inicial propuesto: comercios formales que ya son clientes, con cobros recurrentes y pagos a proveedores. Se elige una actividad comercial para la demo y se mantiene la posibilidad de ampliar a otros rubros.

## 3. Qué representa el perfil

El perfil separa cuatro objetos: persona propietaria o decisora, negocio, cuentas y contratos. Una persona puede administrar varios negocios y un negocio puede tener varios decisores y cuentas. El sistema debe conocer esas relaciones y qué información está autorizado a mostrar a cada asesor.

Cada atributo o hipótesis contiene:

- Valor y unidad, incluyendo moneda cuando corresponda.
- Persona, negocio o cuenta a la que se refiere.
- Fuente y registro de evidencia.
- Fecha del hecho y fecha de incorporación al sistema.
- Estado: declarado por el cliente, observado en registros, calculado o hipótesis pendiente.
- Ventana utilizada y fecha de actualización.
- Cobertura de la información y limitaciones conocidas.
- Vigencia o condición que obliga a revisarlo.
- Corrección o confirmación del cliente o asesor.
- Finalidad permitida y acceso correspondiente.

No se presenta una inferencia como un hecho. «Pagos a proveedores aumentaron» es distinto de «va a abrir otro local»; lo segundo exige confirmación.

## 4. Datos para una personalización detallada

### 4.1 Identidad, titularidad y estructura del negocio

Datos: identificador interno del cliente y del negocio, RUC cuando esté disponible, razón y nombre comercial, actividad declarada, antigüedad, forma de organización, locales, canales de venta, relación entre propietarios y empresa, representante y decisor de compra financiera.

Fuentes propuestas: registros de vinculación, CRM y entrevista al emprendedor. Verificar vigencia de representación y evitar duplicar contactos entre cuentas del mismo negocio.

Permite: saber a quién asesorar, consolidar correctamente el negocio y distinguir quién usa el producto de quién decide contratarlo.

### 4.2 Modelo de negocio y objetivos

Datos: productos o servicios que vende, tipo de compradores, ventas al contado o a crédito, formas de entrega, capacidad de producción o atención, meses fuertes y débiles declarados, principales gastos y dependencia de campañas.

Objetivos expresados: reponer inventario, abrir un local, vender por internet, formalizar procesos, comprar equipo, contratar personal, reducir costos o mantener estabilidad. Registrar horizonte, monto estimado, prioridad y avance.

Fuentes: entrevista, CRM y sistemas de gestión compartidos por el cliente. Los objetivos son declaraciones que se actualizan; no se deducen automáticamente de un pago aislado.

Permite: evaluar productos contra un objetivo concreto y recordar compromisos de seguimiento.

### 4.3 Movimientos financieros y cobertura

Datos por operación: identificador, cuenta, fecha y hora, importe, moneda, dirección de entrada o salida, canal, tipo, estado, reversión, referencia disponible y contraparte seudonimizada. Diferenciar cobros, transferencias propias, préstamos recibidos, devoluciones y aportes del propietario cuando la información permita clasificarlos.

Cobertura: qué cuentas y canales se observan, periodos faltantes y proporción de ventas que el cliente declara cobrar fuera del banco o en efectivo. Un abono no se clasifica automáticamente como venta.

Fuentes: movimientos bancarios; cuentas de otras entidades o billeteras únicamente si existe acceso autorizado; POS y registros de cobro disponibles. La propuesta no supone que esas integraciones estén contratadas.

Permite: reconstruir ciclos de caja y cambios de actividad sin confundir el flujo visible con el total del negocio.

### 4.4 Ventas, compradores y canales comerciales

Datos: ventas diarias o semanales, ticket promedio, número de operaciones, canales de cobro, devoluciones, cancelaciones, ventas recurrentes, cuentas por cobrar y proporción contado/crédito. Información agregada de concentración de compradores; no se necesita copiar la identidad de cada comprador para el primer MVP.

Fuentes: POS, billeteras, facturación, comercio electrónico o sistema de ventas compartido. Si el cliente no los conecta, conservar como datos declarados o desconocidos.

Permite: distinguir aumento del número de ventas de aumento del ticket, detectar necesidades de conciliación y comprobar si un nuevo canal exige otra solución de cobro.

### 4.5 Compras, proveedores e inventario

Datos: fechas e importes de compras, categorías comerciales, frecuencia de reposición, plazos de pago, concentración de proveedores, descuentos por pronto pago, moneda, pedidos comprometidos, mínimos de compra y facturas por pagar. Cuando exista inventario: existencias, rotación, quiebres de stock y tiempo de reposición.

Fuentes: comprobantes, facturación, sistema de inventario y confirmación del cliente. Una transferencia a un proveedor muestra un pago; por sí sola no revela unidades adquiridas, margen ni inventario restante.

Permite: diferenciar una oportunidad de comprar inventario de un problema persistente de rentabilidad y comparar plazos comerciales con alternativas financieras.

### 4.6 Salud financiera y obligaciones

Datos: saldo disponible, entradas y salidas recurrentes, gastos fijos, cuentas por cobrar/pagar, deuda vigente, cuota, vencimientos, utilización de líneas, obligaciones conocidas, historial de pago y evaluación crediticia válida. Registrar ingresos y costos del negocio cuando se disponga de ellos para estimar margen; el flujo bancario aislado no equivale a utilidad.

Variables calculables: volatilidad de cobros, descalce de fechas, concentración de ingresos, obligaciones próximas y escenarios de caja con supuestos explícitos. La reserva necesaria de liquidez se acuerda o modela; no se inventa una regla universal.

Fuentes: sistemas bancarios, registros financieros autorizados y declaración del cliente. La falta de datos no equivale a deuda cero ni a buena capacidad de pago.

Permite: identificar qué falta antes de proponer financiamiento y cuándo conviene resolver gestión de caja en lugar de añadir deuda. La aprobación, límites y precio de crédito dependen del motor y políticas autorizados, no del perfil conversacional.

### 4.7 Productos contratados y uso real

Datos: producto, contrato, titular, fecha de alta, estado, uso, costos aplicables, límites vigentes, renovaciones, productos adicionales, coberturas relevantes y bajas. Registrar integraciones operativas existentes: POS, recaudo, planilla, facturación, conciliación o pasarela.

Si el cliente informa productos en otro banco, conservar su origen y nivel de verificación. No inferir propiedad de una tarjeta o una cuenta a partir del medio de pago de una contraparte.

Permite: evitar duplicaciones, detectar productos infrautilizados y recomendar primero activar una función existente cuando resuelve la necesidad.

### 4.8 Comportamiento operativo y digital

Datos: canales utilizados, tareas que completa o abandona, pasos con errores, frecuencia de consulta, solicitudes de ayuda y problemas operativos documentados. Observar acciones dentro de los servicios donde exista acceso permitido; no asumir seguimiento fuera de ellos.

Variables propuestas: autonomía para una tarea concreta, necesidad de acompañamiento y preferencia por atención humana o digital. Confirmar si un abandono se debe a falta de interés, error técnico, tiempo o información insuficiente.

Permite: adaptar el proceso de contratación y acompañamiento. Que alguien no use la app no demuestra incapacidad, edad ni falta de confianza.

### 4.9 Estilo de decisión y preferencias personales

Datos declarados: interés por una explicación breve o detallada; preferencia por cuotas predecibles o flexibilidad; deseo de comparar alternativas; prioridad entre costo total, disponibilidad y facilidad; necesidad de consultar a un socio; canal, horario y frecuencia de contacto deseados.

Preguntas útiles: «¿Qué te preocupa más al contratar?», «¿Qué información necesitas para decidir?», «¿Prefieres revisar números juntos o recibir un resumen?», «¿Qué producto no quieres que te ofrezcamos?».

Fuentes: entrevista breve y confirmaciones posteriores. Un instrumento de personalidad no es necesario para el MVP. El perfil no diagnostica salud mental ni deduce vulnerabilidades de la persona.

Permite: adaptar la explicación y respetar decisiones. Estas preferencias no se utilizan para decidir acceso al crédito, límites o precio, ni para cobrar distinto según susceptibilidad comercial.

### 4.10 Patrones de decisión a contrastar

Se pueden registrar situaciones concretas: comparar solo la cuota sin revisar el costo total; mantener un servicio pese a expresar que ya no le sirve; preferir una decisión conocida sin comparar alternativas; proyectar ventas sin considerar un escenario menos favorable.

Cada observación incluye contexto, alternativa explicada, respuesta y confirmación. Una sola interacción no permite asignar un sesgo permanente. La ausencia de respuesta no se interpreta como una característica psicológica.

Uso propuesto: presentar comparaciones claras, explicitar supuestos y ayudar a decidir. No usar temor, urgencia o presión para elevar la conversión.

### 4.11 Relación, confianza y experiencia con el banco

Datos: reuniones y acuerdos, reclamos, motivo y estado de resolución, satisfacción declarada, productos cancelados y razones, compromisos pendientes y continuidad del asesor. Conservar notas pertinentes y corregibles, no transcripciones ilimitadas por defecto.

Fuentes: CRM, atención y feedback del cliente. Las opiniones se atribuyen a quien las expresó y al contexto; no se convierten en etiquetas como «cliente difícil».

Permite: priorizar resolver un problema antes de vender y dar continuidad cuando cambia el asesor.

### 4.12 Historial comercial y resultados

Datos: oferta presentada, versión, motivo, fecha, canal, asesor, productos existentes en ese momento, resultado, motivo declarado del rechazo, solicitud, aprobación, activación, uso posterior, cancelación y costo de contacto. Distinguir entrega del mensaje, lectura, interés, aceptación y uso.

Registrar también clientes elegibles a quienes no se contactó y la asignación experimental cuando exista. Separar hechos anteriores a la recomendación de resultados posteriores para evitar filtrar la respuesta al modelo.

Permite: aprender qué intervenciones ayudan y medir efecto incremental. Sin campañas y controles no se debe presentar una probabilidad inventada como propensión validada.

### 4.13 Contexto y acontecimientos del negocio

Datos: campaña comercial declarada, pedidos confirmados, apertura o cierre de local, nueva maquinaria, cambio de proveedor, contratación de personal y fechas relevantes. El contexto de sector o localidad se usa con fuente y fecha; no demuestra que el negocio individual experimente el mismo cambio.

Permite: formular una recomendación o una pregunta en un momento pertinente. Un movimiento de caja no confirma por sí mismo una expansión.

### 4.14 Catálogo, elegibilidad y economía del producto

Datos: producto y versión, necesidades que resuelve, precio y costos, requisitos, incompatibilidades, información que falta para evaluar, límites, vigencia y condiciones. Para comparar valor: ingresos esperados, fondeo, operación, pérdidas y costo de capital aplicables al horizonte y segmento.

Fuentes: catálogo y motores autorizados, con supuestos simulados claramente separados en la demo. Un agente no modifica condiciones ni crea aprobaciones.

Permite: comparar soluciones reales y calcular contribución esperada, en lugar de ordenar ofertas por una comisión o tasa aislada.

### 4.15 Permisos, acceso y preferencias de contacto

Datos: finalidad y alcance del uso permitido, fuente compartida, canales de contacto habilitados, exclusiones, accesos por rol y cambios solicitados por el cliente. Definir conservación, corrección y retirada de fuentes según las reglas aplicables al despliegue.

El acceso del negocio no habilita automáticamente a usar toda la información personal del propietario. El perfilado comercial no requiere salud, religión, orientación sexual, afiliación política, contactos privados ni rastreo de redes sociales. La calidad depende de la pertinencia de los datos, no de acumular información.

## 5. Del perfil estático al dinámico

El MVP puede actualizar diariamente movimientos y productos. Las preferencias y objetivos se revisan cuando el cliente los cambia o cuando una recomendación requiere confirmarlos. Una integración posterior podría reaccionar a eventos; no se necesita tiempo real para demostrar el concepto.

Ventanas propuestas: últimos 30 días, 90 días y 12 meses cuando la cobertura lo permita. Comparar meses o campañas equivalentes solo si existe historial comparable. Distinguir crecimiento, estacionalidad, cambios de cobertura y operaciones extraordinarias.

Un evento modifica primero una observación. Después genera una hipótesis y, si corresponde, una tarea de confirmación. El sistema registra el cambio, su evidencia y qué recomendaciones quedaron desactualizadas. Una recomendación caduca cuando cambia el producto, la elegibilidad, el objetivo o los datos que la sostenían.

## 6. Agentes y coordinación

| Componente | Responsabilidad | Entrega |
| --- | --- | --- |
| Agente de perfil | Consolidar fuentes y detectar contradicciones o vacíos | Perfil actualizado con evidencia y preguntas |
| Agente de cobros | Analizar operación y conciliación | Propuesta de cobro o uso de un producto existente |
| Agente de liquidez | Examinar necesidad y desfase de caja | Evaluación de alternativas de capital de trabajo |
| Agente de factoring | Revisar facturas y condiciones disponibles | Propuesta condicionada a documentación y elegibilidad |
| Agente que representa al cliente | Cuestionar utilidad, costo y duplicación de propuestas | Objeciones y alternativas |
| Coordinador | Comparar propuestas y decidir siguiente acción | Una recomendación principal, alternativa o no contactar |

Los agentes de producto defienden sus propuestas con evidencia, pero no se adjudican la venta. Comparten el mismo perfil autorizado y reglas. El MVP puede iniciar con cobros, liquidez y factoring, más perfil y coordinación; otros especialistas quedan para una fase posterior.

Formato común de propuesta: necesidad, hechos observados, hipótesis, beneficio para el cliente, costo, requisitos, evaluación económica, información pendiente, razones para descartarla y vigencia.

Los cálculos económicos y las comprobaciones de elegibilidad se ejecutan en funciones verificables. El modelo organiza evidencia, contrasta alternativas y prepara la explicación.

## 7. Experiencia del asesor

La ficha responde: qué negocio es, qué intenta conseguir, qué cambió, qué necesita confirmación, qué productos usa y qué conviene hacer ahora. El asesor puede abrir la evidencia, corregir el perfil, registrar lo que confirmó el cliente y descartar una recomendación indicando el motivo.

El copiloto prepara una conversación: pregunta inicial, necesidad que quiere validar, comparación de alternativas y próximos pasos. Las comunicaciones permanecen como borradores revisables en el MVP.

## 8. Datos mínimos y enriquecimiento

Para el MVP: clientes y negocios sintéticos, titularidad de cuentas, seis a doce meses de movimientos sintéticos, objetivos y preferencias declaradas, contratos, catálogo versionado, elegibilidad simulada y supuestos económicos. Incorporar escenarios sin necesidad, con datos insuficientes y con productos ya contratados.

Para un piloto comercial: historial real autorizado de productos, uso y campañas, costos, resultados de crédito aplicables, feedback y grupos de comparación. Esos datos permitirían validar utilidad y efecto incremental.

Enriquecimiento posterior: inventario, facturas detalladas, pedidos, plataformas de venta y otras cuentas compartidas. No bloquear el producto si una fuente es opcional; reducir lo que afirma y pedir confirmación donde falta evidencia.

IBM y SAML-D son sintéticos y orientados a AML. No representan clientes BCP ni contienen un perfil comercial completo. Pueden reutilizarse para una navegación transaccional limitada, pero no proporcionan personalidad, preferencias, propensión de compra ni rentabilidad por cliente. Para esta demo conviene un dataset comercial sintético específico, con verdad de referencia y trazabilidad de supuestos.

## 9. Escenario de demostración

Una panadería tiene un objetivo declarado de ampliar ventas y una preferencia por mantener cuotas predecibles. Los registros muestran más compras, pero no permiten concluir que necesita un préstamo.

El agente de liquidez solicita confirmar el pedido y el calendario de cobro. El de cobros detecta tareas manuales que el propietario confirma. El asesor registra que la caja es suficiente y que el problema principal es la conciliación. El coordinador prioriza resolver cobros.

En otro momento aparece un pedido confirmado que exige comprar insumos antes de cobrar. El sistema actualiza el perfil y vuelve a comparar alternativas. El perfil no encierra al cliente en una categoría permanente; cambia con la evidencia.

## 10. Evaluación y éxito

- Calidad del perfil: exactitud, fuente, vigencia y cobertura; hipótesis presentadas como tales.
- Pertinencia: necesidad confirmada, producto no duplicado y elegibilidad vigente.
- Experiencia: utilidad declarada por asesor y cliente; tiempo de preparación y facilidad de corrección.
- Relación: uso sostenido, problemas resueltos y seguimiento de objetivos; la permanencia sola no demuestra satisfacción.
- Negocio: activaciones y contribución incrementales frente a un grupo comparable, descontando costos y riesgo.
- Trazabilidad: reproducción de la evidencia y reglas que llevaron a cada recomendación.

Una demo sintética valida el flujo, no un incremento real de ventas o fidelidad. El planteamiento comercial y sus antecedentes se desarrollan en [Análisis de oportunidad BCP](ANALISIS-OPORTUNIDAD-COMERCIAL-BCP.md).

## 11. Alcance inicial propuesto

Un rubro de mype, un banco de referencia, perfil dinámico y tres alternativas de producto. El cierre de la demo es una recomendación revisable por el asesor, con evidencia y capacidad de actualizarse tras la conversación. El siguiente paso es definir el rubro y el esquema del dataset comercial sintético.
