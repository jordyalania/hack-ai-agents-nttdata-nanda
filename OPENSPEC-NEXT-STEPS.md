# OpenSpec: integración y siguientes pasos

OpenSpec 1.14.3 está instalado localmente como dependencia de desarrollo, fijado en `package.json` y `package-lock.json`. Node requerido: 20.19.0 o posterior. La configuración del proyecto está en `openspec/config.yaml`; las seis skills para Codex están en `.agents/skills/`.

OpenSpec organiza el desarrollo por especificaciones. No es el runtime de los especialistas comerciales ni una conexión a BCP.

## Comandos del repositorio

```bash
npm ci
npm run spec -- --version
npm run spec:status
npm run spec:validate
npm run spec -- status --change mype-copilot-mvp
```

Los scripts desactivan telemetría y comprobación automática de actualizaciones en sus ejecuciones. No se cambió la configuración global de otras instalaciones.

## Plan preparado

Cambio: `openspec/changes/mype-copilot-mvp/`.

- `proposal.md`: alcance y resultados de la demo.
- `specs/`: datos comerciales, perfiles dinámicos, propuestas de producto y ficha del asesor.
- `design.md`: arquitectura propuesta y decisiones.
- `tasks.md`: trabajo de implementación y comprobación, todavía pendiente.

La validación estricta de OpenSpec aprobó. Eso comprueba la estructura del plan; no significa que la aplicación esté implementada ni que sus pruebas hayan pasado.

## Orden de trabajo

1. Revisar el alcance propuesto: panaderías/comercios de alimentos como supuesto inicial y doce meses sintéticos.
2. Crear esquema relacional y generador de datos, conservando evidencia y cobertura.
3. Implementar perfil dinámico y correcciones versionadas.
4. Implementar especialistas de cobros, liquidez y factoring, revisión del cliente y coordinador.
5. Construir la ficha CRM con conversación y propuestas en contexto.
6. Conectar evento confirmado → nueva versión del perfil → reevaluación → actualización visible.
7. Verificar escenarios y presentar la demo; archivar el cambio cuando esté completado.

En Codex, el siguiente flujo es `$openspec-apply-change mype-copilot-mvp`, o pedir «aplica el cambio mype-copilot-mvp». La instalación informa que las nuevas skills pueden requerir reiniciar o recargar el entorno para aparecer en el selector. La CLI ya funciona en este repositorio.

## Referencia visual

[Panel CRM Mype360 v1](visualizaciones/panel-crm-mypes-v1.png).

Imagen conceptual generada con la herramienta integrada de imágenes. [Prompt completo](visualizaciones/panel-crm-mypes-v1.prompt.md). No se recibió la imagen de referencia Buzz mencionada; esta primera versión interpreta la descripción del usuario.

## Fuentes oficiales

- [Configuración inicial](https://openspec.dev/docs/setup).
- [Configuración del proyecto](https://openspec.dev/docs/project-config).
- [Comandos de la CLI](https://openspec.dev/docs/cli).
- [Integración por herramienta](https://openspec.dev/docs/supported-tools).
