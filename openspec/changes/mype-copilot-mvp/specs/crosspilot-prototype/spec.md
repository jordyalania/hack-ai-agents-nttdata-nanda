# Spec Delta

## Purpose

Actualizar la marca a CrossPilot y adoptar el prototipo interactivo aportado por el usuario como referencia de la web principal, conservando la información de la fase anterior.

## ADDED Requirements

### Requirement: Integración aditiva de cartera sintética
El sistema SHALL preservar los identificadores, datos fuente y unidades del Excel, exponer una proyección compatible visualmente con la ficha y conservar separadas las políticas y carteras del prototipo.

#### Scenario: Explorar la cartera beta
- **WHEN** el asesor abre la cartera beta
- **THEN** consulta clientes, transacciones, contratos, consentimientos y catálogo relacionados, distingue propuestas no activas y no sobrescribe su cartera privada

#### Scenario: Fuente incoherente
- **WHEN** el importador encuentra una referencia inválida o un saldo no conciliado
- **THEN** rechaza la carga antes de escribir y comunica el problema

#### Scenario: Métricas distintas
- **WHEN** se proyecta un cliente del libro
- **THEN** sus ventas, resultado operativo, cuotas, excedente y saldo de deuda permanecen diferenciados y no se aplican reglas de negociación incompatibles

### Requirement: Prototipo ejecutable y marca CrossPilot
El sistema SHALL renderizar la agenda, negociación, aprobación, ficha, postvisita y perfil del ZIP mediante React nativo, con marca CrossPilot y sin depender del runtime Claude Design ausente.

#### Scenario: Abrir la nueva web
- **WHEN** el usuario abre la ruta principal
- **THEN** ve CrossPilot, la agenda de cinco clientes priorizados de una cartera de diez y el acceso al perfil, sin etiquetas de plantilla sin resolver

### Requirement: Revisión humana de propuestas
El sistema SHALL permitir incluir productos y editar montos antes de aprobar, y SHALL rechazar montos que incumplan la política simulada.

#### Scenario: Monto por encima de Riesgo
- **WHEN** el asesor intenta aprobar S/20,000 después de que Riesgo contraofertó S/12,000
- **THEN** la aprobación falla con motivo explícito y no se genera ficha hasta corregir el monto

### Requirement: Resultado de visita explícito
El sistema SHALL requerir confirmación explícita del resultado antes de añadir productos sintéticos a la cartera.

#### Scenario: Nota ambigua
- **WHEN** el asesor registra una nota sin confirmar aceptación
- **THEN** el resultado queda por confirmar o lo pensará y no aumenta el número de productos

### Requirement: Persistencia del nuevo estado e independencia histórica
El sistema SHALL guardar el nuevo prototipo en una cartera Supabase por asesor con RLS y revisión optimista, manteniendo las tablas históricas sin borrarlas ni sobrescribirlas.

#### Scenario: Otro asesor y revisión antigua
- **WHEN** un usuario consulta una cartera de otro asesor o guarda una revisión superada
- **THEN** no accede a las filas ajenas y el guardado obsoleto se rechaza sin sobrescribir cambios

### Requirement: Contención de errores y respuestas atrasadas
El sistema SHALL cancelar el análisis pendiente al cambiar de cliente y SHALL identificar el modo simulado y el fallo de agente.

#### Scenario: Cambiar cliente durante negociación
- **WHEN** el asesor selecciona otro cliente antes de terminar la animación
- **THEN** no aparece una oferta del cliente anterior en el nuevo contexto

### Requirement: Adaptación móvil y fidelidad visual
El sistema SHALL conservar los colores, tipografías y composición del prototipo, adaptando tablas y perfil al ancho disponible.

#### Scenario: Pantalla estrecha
- **WHEN** la web se muestra a 390 píxeles de ancho CSS
- **THEN** las tablas pueden desplazarse dentro de su contenedor sin desbordar horizontalmente la página
