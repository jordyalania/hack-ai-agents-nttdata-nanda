# Spec Delta

## Purpose

Dar al asesor una ficha centralizada con conversación, perfil del negocio, evidencia y propuestas actualizadas de especialistas de producto.

## ADDED Requirements

### Requirement: Ficha centralizada del cliente
El sistema SHALL presentar al abrir un negocio su perfil, objetivos, preferencias declaradas, contratos, conversación y equipo de agentes, identificando fecha de actualización y datos sintéticos.

#### Scenario: Abrir una ficha
- **WHEN** el asesor selecciona un negocio de su cartera
- **THEN** ve conversación, perfil y propuestas del mismo negocio en una ficha y puede consultar la evidencia sin cambiar de cliente

### Requirement: Conversación y eventos comerciales
El sistema SHALL permitir registrar mensajes de demostración y distinguir el texto del cliente, las notas del asesor y los eventos extraídos pendientes de confirmación.

#### Scenario: Mensaje sobre un pedido
- **WHEN** se registra un mensaje que menciona un nuevo pedido
- **THEN** se conserva el mensaje fuente y se propone un evento sin convertir detalles no confirmados en hechos

### Requirement: Reevaluación visible después de cambios
El sistema SHALL actualizar el estado visible del perfil y reevaluar las propuestas cuando un evento confirmado cambie sus datos relevantes, indicando ejecución en curso, nueva versión o error.

#### Scenario: Confirmación de nuevo pedido
- **WHEN** el asesor confirma el pedido y su plazo de cobro
- **THEN** ve una nueva versión del perfil y propuestas reevaluadas contra ella, sin reutilizar silenciosamente una recomendación anterior

### Requirement: Revisión y feedback del asesor
El sistema SHALL mostrar alternativas, descartes, preguntas pendientes y próxima acción, y permitir corregir el perfil o registrar el motivo de rechazo de una propuesta.

#### Scenario: Información insuficiente
- **WHEN** el coordinador requiere conocer la fecha de cobro
- **THEN** la ficha muestra esa pregunta y no presenta una oferta como aprobada

### Requirement: Borradores sin envío automático
El sistema SHALL preparar borradores de conversación revisables sin enviar mensajes ni contratar productos desde el MVP.

#### Scenario: Preparar una respuesta
- **WHEN** el asesor solicita un borrador
- **THEN** puede leerlo y modificarlo y no se realiza ninguna comunicación externa
