# NandaTown: instalación y resumen

Preparado el 17 de octubre de 2026. Repositorio: https://github.com/projnanda/nandatown

## Qué tienes instalado

- Código en `nandatown/`, rama `main`, commit `09317903cd7e33ec2a79b88af447b5403c6d2054` del 12 de octubre de 2026.
- Paquete NandaTown 0.2.0 en `nandatown/.venv`, con Python 3.12.14 y dependencias de desarrollo.
- Web Next.js 16.2.6 / React 19.2.4 en `nandatown/apps/nest-dashboard`, con dependencias instaladas y compilación de producción generada.
- Estado e identidades locales en `.nandatown-state/`, fuera del repositorio. Esa carpeta contiene claves locales: mantenla privada.
- Código original sin modificaciones.

## Abrir y arrancar

Laboratorio interactivo: http://127.0.0.1:8901

Web del proyecto: http://127.0.0.1:3000

Ambos servidores se iniciaron durante la preparación y respondieron HTTP 200. Para volver a iniciarlos tras cerrarlos, ejecuta cada comando en una terminal distinta:

```bash
cd "/Users/jb/Documents/ChatGPT/NTTDaTA NANDA"
./iniciar-laboratorio.sh
```

```bash
cd "/Users/jb/Documents/ChatGPT/NTTDaTA NANDA"
./iniciar-web.sh
```

Si el puerto está ocupado, la instancia anterior puede seguir funcionando. Los lanzadores permiten cambiarlo, por ejemplo `PORT=3001 ./iniciar-web.sh`. En una terminal, Ctrl+C detiene su servidor.

## Para qué sirve y cómo funciona

Es un banco de pruebas local para sistemas de agentes de IA. Permite definir una tarea, elegir agentes y reglas, provocar fallos y revisar qué ocurrió. Su foco es comprobar cooperación, descubrimiento, confianza y recuperación, además de la respuesta final.

Tiene tres modos:

| Modo | Funcionamiento | Uso típico |
| --- | --- | --- |
| Lab | Simulación con agentes programados, semilla y tiempo lógico | Probar mercados, subastas, votaciones, consenso y protocolos |
| Track | Agentes en procesos separados, coordinador FastAPI y buzón SQLite por HTTP | Verificar reinicios, duplicados, entregas y confirmaciones |
| Path | Llama a un agente externo que ya expone un endpoint A2A | Comprobar una cotización sintética y su respuesta al repetir la petición |

El Lab tiene doce capas intercambiables: transporte, comunicación, identidad, registro, autorización, confianza, pagos, coordinación, negociación, memoria, privacidad y hechos/evidencias. Los pagos de sus ejemplos son simulados.

Cada ejecución guarda cinco registros canónicos: perfil, ejecución, intenciones, eventos y resultado. Un manifiesto permite verificar sus hashes y reproducir la evaluación. También hay informes y un visor HTML.

La web Next.js es una aplicación aparte con información del proyecto, galería de contribuciones y registro de skills. Su catálogo no ejecuta agentes. Para ejecutar pruebas utiliza la CLI o el laboratorio del puerto 8901.

## Estado del proyecto

La versión instalada es 0.2.0. El núcleo local ya implementa simulaciones, fallos de procesos, evidencias, adaptadores MCP/A2A e interfaces de terminal y navegador. El repositorio incluye CI para Python 3.11/3.12 y compilación de la web; no se comprobó el estado remoto de esas ejecuciones.

La documentación mantiene pendientes hitos de adopción e integración externa: reproducir pruebas con agentes independientes, coordinar runtimes reales distintos y validar un recorrido contra un NANDA Index desplegado. Actualmente la resolución de Path admite URL directa o un índice local de ejemplo. Los plugins del Lab no se convierten automáticamente en integraciones con servicios reales.

Hay una versión anterior archivada en `archive/legacy` y `v1-final`. La rama principal se reconstruyó; una contribución antigua fusionada no demuestra por sí sola que su código original se ejecute en esta versión.

## Comprobaciones realizadas

- Suite completa: **1865 pruebas aprobadas**, 8 avisos, en 242,61 segundos. Los avisos son de deprecación y recolección de clases, sin fallos. La ejecución requiere permitir puertos locales.
- `marketplace`: PASSED, 8 etapas aprobadas; 65 eventos y 24 intenciones registrados.
- `quote-crash-restart`: PASSED, 8 etapas aprobadas; el vendedor cayó, se reinició y completó la cotización de 3990 centavos una sola vez. Identidad portable quedó sin probar en ese perfil.
- Ambos bundles pasaron `nandatown verify`.
- Visor generado en `nandatown/runs/sim-3e489ed7091e/town.html`.
- Compilación de producción de Next.js: correcta, incluyendo TypeScript.
- Laboratorio y web: HTTP 200 en sus rutas iniciales.

Estas pruebas usaron participantes de referencia y no necesitaron claves de un proveedor de modelos. Todavía no se conectó ni evaluó un agente tuyo.

## Comandos útiles

```bash
cd "/Users/jb/Documents/ChatGPT/NTTDaTA NANDA/nandatown"
source .venv/bin/activate
export NANDATOWN_HOME="$PWD/../.nandatown-state"

nandatown scenarios
nandatown profiles
nandatown run marketplace
nandatown run quote-crash-restart
nandatown report runs/sim-3e489ed7091e
nandatown verify runs/sim-3e489ed7091e
```

Para un agente propio, revisa `nandatown/docs/testing-an-existing-agent.md`: ofrece conexión A2A, programa participante del buzón HTTP o participante arrancado por separado.

## Configuración opcional de la web

No se configuraron servicios externos ni credenciales. El registro de skills necesita `DATABASE_URL` de Neon Postgres; el acceso con Google necesita `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET` y `APP_BASE_URL`. La galería consulta GitHub y puede usar `GITHUB_TOKEN`; el webhook requiere `GITHUB_WEBHOOK_SECRET`.

El ejemplo disponible es `nandatown/apps/nest-dashboard/.env.example`; la configuración privada se coloca en `.env.local`. La compilación descarga fuentes de Google y consulta GitHub, por lo que requiere conexión.

## Archivos para orientarte

- `nandatown/README.md`: guía completa de comandos y alcance.
- `nandatown/docs/architecture.md`: mapa de módulos.
- `nandatown/docs/convergence.md`: implementación actual y hitos externos pendientes.
- `nandatown/src/nandatown/`: núcleo Python.
- `nandatown/src/nandatown/sim/scenarios/`: escenarios YAML.
- `nandatown/tests/`: suite de pruebas.
- `nandatown/apps/nest-dashboard/`: web Next.js.
- `nandatown/runs/`: resultados locales y evidencias.
