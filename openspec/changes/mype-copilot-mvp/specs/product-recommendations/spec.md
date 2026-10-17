# Spec Delta

## Purpose

Comparar propuestas de producto contra necesidades verificables del negocio y devolver una próxima acción explicable y revisable por el asesor.

## ADDED Requirements

### Requirement: Propuestas comparables de especialistas
El sistema SHALL obtener propuestas de cobros, capital de trabajo y factoring con necesidad, evidencia, beneficio, costos, requisitos, información pendiente y motivos de descarte en un formato común.

#### Scenario: Analizar una mype
- **WHEN** se solicita una recomendación con un perfil vigente
- **THEN** cada especialista devuelve una propuesta válida o un descarte explícito y todas las respuestas identifican la versión del perfil utilizada

### Requirement: Validación de condiciones y economía
El sistema SHALL comprobar duplicación, elegibilidad, vigencia y supuestos económicos con reglas versionadas independientes del texto generado por los agentes.

#### Scenario: Producto ya contratado
- **WHEN** un especialista propone un producto que ya satisface la misma necesidad mediante un contrato vigente
- **THEN** la propuesta de nueva contratación se descarta y se puede recomendar utilizar el producto existente

#### Scenario: Falta información de costos
- **WHEN** no existen costos suficientes para comparar contribución neta
- **THEN** el sistema muestra contribución no calculable y no inventa un ranking numérico de rentabilidad

### Requirement: Revisión en interés del cliente y decisión coordinada
El sistema SHALL contrastar las propuestas mediante una revisión de utilidad y costo para el cliente y devolver recomendar, solicitar información o no ofrecer, con razones y alternativas descartadas.

#### Scenario: Dificultad operativa sin necesidad de crédito
- **WHEN** el cliente confirma caja suficiente y dificultad de conciliación
- **THEN** el coordinador descarta el crédito por falta de necesidad acreditada y considera una solución de cobros pertinente

#### Scenario: Facturas desconocidas
- **WHEN** factoring requiere facturas cuya existencia o condiciones no están documentadas
- **THEN** la propuesta queda condicionada y la próxima acción solicita esa información sin presentarla como oferta aprobada

#### Scenario: Ninguna alternativa adecuada
- **WHEN** ninguna propuesta supera las comprobaciones de necesidad y condiciones
- **THEN** el resultado es no ofrecer con motivos explícitos

### Requirement: Trazabilidad de ejecución y fallos
El sistema SHALL registrar especialista, herramientas, evidencias, reglas y versión del modelo de cada ejecución, distinguir modo con modelo real de modo simulado y contener respuestas inválidas o errores sin fabricar resultados.

#### Scenario: Modelo no configurado
- **WHEN** se ejecuta la demostración sin proveedor de modelo configurado
- **THEN** el sistema identifica su modo simulado y no afirma que hubo razonamiento de un modelo real

#### Scenario: Respuesta inválida
- **WHEN** un especialista devuelve una referencia inexistente o una respuesta fuera de contrato
- **THEN** se registra el fallo y esa propuesta no se selecciona como recomendación válida
