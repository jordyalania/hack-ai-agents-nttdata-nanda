# Spec Delta

## Purpose

Proveer datos comerciales sintéticos relacionados y reproducibles para demostrar el copiloto sin atribuirlos a clientes reales de BCP.

## ADDED Requirements

### Requirement: Identidad y relaciones comerciales
El sistema SHALL representar personas, negocios, relaciones de titularidad, cuentas, movimientos y contratos mediante identificadores estables y relaciones verificables.

#### Scenario: Persona con dos negocios
- **WHEN** una persona participa en dos negocios con cuentas diferentes
- **THEN** el sistema mantiene separados sus movimientos y contratos y muestra la relación de la persona con ambos negocios

#### Scenario: Referencia inexistente
- **WHEN** un movimiento apunta a una cuenta inexistente
- **THEN** la carga informa el registro inválido y no lo incorpora silenciosamente

### Requirement: Generación reproducible
El sistema SHALL generar datos marcados como sintéticos a partir de una semilla y una fecha de referencia explícitas, con escenarios de cobros, liquidez, factoring, ausencia de necesidad y datos insuficientes.

#### Scenario: Misma configuración
- **WHEN** se generan datos dos veces con igual semilla, fecha y versión del generador
- **THEN** los registros de negocio equivalentes son idénticos y el manifiesto identifica esa configuración

#### Scenario: Factoring con evidencia
- **WHEN** el escenario declara una necesidad de adelantar facturas
- **THEN** existen facturas relacionadas con el negocio, sus vencimientos y su condición simulada de elegibilidad

### Requirement: Información faltante y cobertura
El sistema SHALL distinguir valor cero, dato desconocido y fuente no disponible, preservando moneda, ventana temporal y cobertura de los movimientos.

#### Scenario: Venta fuera del banco
- **WHEN** solo hay movimientos bancarios y el cliente declara ventas adicionales en efectivo
- **THEN** el perfil identifica su cobertura parcial y no presenta los abonos como ventas totales

### Requirement: Separación de evaluación y contexto de agentes
El sistema SHALL mantener los resultados esperados de cada escenario fuera del contexto disponible para los agentes y SHALL identificar las condiciones comerciales simuladas como supuestos.

#### Scenario: Ejecución de un caso de referencia
- **WHEN** un agente analiza un negocio con una recomendación esperada reservada para evaluación
- **THEN** recibe los datos comerciales permitidos pero no la recomendación esperada ni etiquetas AML como objetivo comercial
