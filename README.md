# Hack AI Agents — NTT DATA + Sundai LATAM + NANDA

Espacio de trabajo para explorar los retos y desarrollar el proyecto de la hackatón de Perú Tech Week del 17 de octubre de 2026.

## Documentación

- [Base de la hackatón](BASE-HACKATON.md): diez casos de banca, minería y manufactura, datasets sugeridos y cinco criterios de evaluación.
- [Entorno NandaTown](LEEME-NANDATOWN.md): preparación local, alcance y comprobaciones realizadas en el equipo original.

El caso de uso y el alcance del prototipo están pendientes de elección.

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
