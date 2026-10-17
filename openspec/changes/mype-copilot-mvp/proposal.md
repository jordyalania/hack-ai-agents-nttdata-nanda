# Proposal

## Why

El asesor necesita comprender qué cambió en cada mype y qué solución resulta pertinente, con evidencia que distinga hechos, preferencias declaradas e hipótesis. El brief ya define la visión; falta un recorrido ejecutable que conecte datos comerciales, perfil dinámico y propuestas de agentes revisadas por el asesor.

## What Changes

- Crear un dataset comercial sintético reproducible con personas, negocios, cuentas, movimientos, contratos, objetivos, preferencias, facturas, catálogo y elegibilidad simulada.
- Construir un perfil con fuentes, vigencia y cobertura, actualizable después de una confirmación o un nuevo evento.
- Incorporar especialistas de cobros, capital de trabajo y factoring; contrastar sus propuestas con un agente que representa al cliente y un coordinador.
- Mostrar cartera, ficha del negocio, evidencias, alternativas y próxima acción, incluyendo pedir información y no ofrecer.
- Preparar una demo con casos de necesidad válida, producto existente, datos insuficientes y cambio de recomendación.
- Supuesto inicial revisable: panaderías y pequeños comercios de alimentos; doce meses sintéticos y un asesor local de demostración.
- Fuera de alcance: conexión con BCP, datos personales reales, campañas automáticas, aprobación de crédito, modelos clínicos de personalidad y rentabilidad comercial probada.

## Capabilities

### New Capabilities

- `commercial-data`: contratos de datos, integridad, generación reproducible y separación entre entradas y resultados de evaluación.
- `dynamic-profiles`: consolidación por negocio, preferencias declaradas, observaciones, hipótesis, evidencia y actualización versionada.
- `product-recommendations`: propuestas de especialistas, comprobaciones deterministas, revisión de pertinencia y coordinación trazable.
- `advisor-workspace`: cartera, perfil, comparación de alternativas, confirmación/corrección y borradores revisables.

### Modified Capabilities

Ninguna. No existen especificaciones de producto previas en OpenSpec.

## Impact

Se proponen componentes nuevos fuera de `nandatown/`: datos sintéticos, servicio de perfilado y recomendación, e interfaz del asesor. Python y una interfaz web con TypeScript son candidatos del diseño; el runtime de agentes se decide explícitamente durante implementación. OpenSpec ya está instalado como herramienta de desarrollo y no ejecuta los agentes del producto. Los datasets AML y el submódulo se conservan como recursos independientes. No hay cambios incompatibles para los lanzadores existentes.
