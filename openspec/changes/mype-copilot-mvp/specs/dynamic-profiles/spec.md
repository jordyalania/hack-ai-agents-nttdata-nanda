# Spec Delta

## Purpose

Mantener un perfil comercial por negocio que explique sus datos, preferencias y cambios sin confundir observaciones con conclusiones pendientes de confirmar.

## ADDED Requirements

### Requirement: Evidencia y naturaleza de cada atributo
El sistema SHALL mostrar valor, sujeto, fuente, fecha, cobertura y estado de cada atributo relevante: declarado, observado, calculado o hipótesis.

#### Scenario: Posible expansión
- **WHEN** aumentan los pagos a proveedores sin una declaración de apertura de local
- **THEN** el perfil muestra el aumento como observación y la expansión únicamente como hipótesis pendiente

### Requirement: Actualización versionada y corrección
El sistema SHALL producir una versión nueva del perfil al incorporar evidencia o una corrección del asesor, conservando autor, fecha, motivo y versión anterior.

#### Scenario: Confirmar objetivo
- **WHEN** el asesor registra que el cliente confirmó la compra de un equipo
- **THEN** el objetivo queda como declaración confirmada, conserva su fuente y aparece en una nueva versión del perfil

### Requirement: Vigencia de recomendaciones
El sistema SHALL identificar las recomendaciones desactualizadas cuando cambie la versión del perfil, catálogo o elegibilidad que las sustentó y SHALL exigir una reevaluación antes de presentarlas como actuales.

#### Scenario: Producto contratado después de recomendar
- **WHEN** se incorpora un contrato del producto previamente recomendado
- **THEN** la recomendación anterior se marca como desactualizada y no se sigue ofreciendo como producto faltante

### Requirement: Preferencias para comunicación y uso permitido
El sistema SHALL usar preferencias declaradas para adaptar explicaciones y contacto, sin deducir diagnósticos psicológicos ni utilizar esas preferencias para modificar crédito, límites o precios.

#### Scenario: Cliente prefiere explicación breve
- **WHEN** cambia la preferencia declarada de explicación detallada a breve
- **THEN** cambia la presentación de la conversación, pero permanecen iguales las condiciones y la evaluación financiera bajo los mismos datos económicos

#### Scenario: Fuente no habilitada
- **WHEN** una fuente queda fuera del alcance permitido para perfilado comercial
- **THEN** las nuevas versiones y recomendaciones excluyen sus datos y conservan un registro del cambio de cobertura
