# Hack AI Agents — NTT DATA + Sundai LATAM + NANDA

Espacio de trabajo para explorar los retos y desarrollar el proyecto de la hackatón de Perú Tech Week del 17 de octubre de 2026.

## Documentación

- [Base de la hackatón](BASE-HACKATON.md): diez casos de banca, minería y manufactura, datasets sugeridos y cinco criterios de evaluación.
- [Entorno NandaTown](LEEME-NANDATOWN.md): preparación local, alcance y comprobaciones realizadas en el equipo original.

Se explora banca en Perú, usando BCP como referencia. La propuesta actual es un agente de prospección y venta cruzada para negocios; el análisis previo de AML y sus datasets se conserva como exploración inicial.

## Clonar el proyecto

```bash
git clone --recurse-submodules https://github.com/jordyalania/hack-ai-agents-nttdata-nanda.git
cd hack-ai-agents-nttdata-nanda
```

Si ya clonaste sin submódulos:

```bash
git submodule update --init --recursive
```

[NandaTown](https://github.com/projnanda/nandatown) se incluye como submódulo fijado a una revisión concreta. Conserva su historial y su licencia original. Las dependencias y los resultados de ejecución del equipo original no se incluyen; para preparar otra máquina, sigue la documentación del submódulo.

## Lanzadores locales

Una vez instaladas las dependencias y compilada la web:

```bash
./iniciar-laboratorio.sh
./iniciar-web.sh
```

Ejecuta cada comando en una terminal distinta. El laboratorio usa el puerto 8901 y la web el 3000. Los lanzadores esperan el entorno Python en `nandatown/.venv` y las dependencias de la web en `nandatown/apps/nest-dashboard/node_modules`.

El estado local de los agentes, las claves y los archivos de configuración privados se excluyen mediante `.gitignore`.

## Datos bancarios

[Datasets AML y esquema](data/banca/README.md): IBM HI/LI Small y SAML-D, con descarga reproducible, metadatos y perfiles. Los datos originales se guardan solo en local.

## Propuesta comercial en exploración

[Análisis de oportunidad BCP](ANALISIS-OPORTUNIDAD-COMERCIAL-BCP.md): evidencia pública, nicho propuesto, productos candidatos y datos necesarios para un agente de venta cruzada.

[Brief del copiloto para mypes](BRIEF-COPILOTO-COMERCIAL-MYPES.md): visión, perfilado detallado, fuentes de datos, agentes, experiencia del asesor y alcance del MVP.

## Desarrollo con OpenSpec

[Integración y siguientes pasos](OPENSPEC-NEXT-STEPS.md). Instalación local: `npm ci`. Verificación del plan: `npm run spec:validate`. Primer cambio: `mype-copilot-mvp`.

[Concepto visual de la ficha CRM](visualizaciones/panel-crm-mypes-v1.png): conversación, perfil y propuestas de agentes comerciales en una pantalla.

## Backend y Supabase

[Configuración, autenticación y MCP](services/backend/README.md). Node.js 22+. Arranque: `npm run backend:dev`. Pruebas: `npm run backend:test`. Comprobación remota de solo lectura: `npm run supabase:check`.

## Base web de Lovable

[base-web/](base-web/README.md) contiene el frontend de [mype-connect](https://github.com/jordyalania/mype-connect), incorporado como submódulo. Sus cambios se guardan en ese repositorio y se sincronizan con Lovable.

Para descargarlo junto con este proyecto: `git submodule update --init --recursive`.

## Web CrossPilot y Supabase

La aplicación está en el submódulo [`base-web`](https://github.com/jordyalania/mype-connect). Su ruta principal sigue el ZIP CrossPilot: agenda, perfil lateral, negociación entre agentes, aprobación, ficha y postvisita. El estado se guarda en `crosspilot_workspaces` de Supabase, con RLS por asesor y revisión optimista. Las tablas y el motor de la primera fase se conservan por compatibilidad.

```sh
git submodule update --init base-web
npm ci
npm --prefix base-web ci
npm run web:dev -- --host 127.0.0.1 --port 5173
```

Consulta `base-web/README.md`, `base-web/docs/DATOS-Y-ARQUITECTURA.md` y `base-web/docs/VERIFICACION.md` para el guion, el esquema de once tablas y las pruebas. El backend opcional (`npm run backend:dev`) ofrece sesión, consulta/corrección de perfil y adaptador narrativo de modelo. No hay proveedor LLM configurado: la web identifica sus reglas simuladas y no exige una clave de IA para la demo.

El repositorio `mype-connect` mantiene su privacidad original. Sus propios GitHub Actions ejecutan tipos, lint del MVP, tests y build. El CI del repositorio principal valida OpenSpec sin pedir acceso al repositorio privado. Las pruebas del backend se ejecutan localmente con `npm run backend:test`, después de inicializar `base-web` con una cuenta autorizada; no se configura un token compartido entre repositorios.

Consulta el [resumen general del proyecto y la base de datos](RESUMEN-PROYECTO-Y-BASE-DE-DATOS.md) para ver dónde está Supabase, qué tablas existen, qué datos están cargados y cómo funciona el MVP.

## CrossPilot · prototipo actual

La web principal se actualizó a partir de `Prototipo interactivo Crosspilot.zip`. La fuente extraída está en `referencias/crosspilot-design/` y su adaptación React reproducible en `base-web/`. Ver [guía actual](base-web/docs/CROSSPILOT-PROTOTIPO.md). El estado activo ahora se guarda en `crosspilot_workspaces` dentro del mismo Supabase; las tablas `mype_*` permanecen como compatibilidad de la fase anterior. El producto se llama CrossPilot; los nombres de repositorios e identificadores históricos se mantienen.
