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
