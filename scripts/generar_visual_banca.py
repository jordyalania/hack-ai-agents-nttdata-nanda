#!/usr/bin/env python3
"""Genera la vista de esquema y su diccionario a partir del perfil calculado."""
from pathlib import Path
import argparse,json
ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('--output',type=Path,default=ROOT/'visualizaciones/esquema-banca.html')
args=parser.parse_args()
data=json.loads((ROOT/'data/banca/metadata/profiles.json').read_text())
assert len(data)==5,'Se esperan tres archivos de transacciones y dos de cuentas.'
template=(ROOT/'visualizaciones/esquema-banca.template.html').read_text()
payload=json.dumps(data,ensure_ascii=False).replace('</','<\\/')
assert template.count('__PROFILES_JSON__')==1
args.output.parent.mkdir(parents=True,exist_ok=True)
args.output.write_text(template.replace('__PROFILES_JSON__',payload))
md=['# Diccionario de los archivos bancarios locales','','Calculado leyendo los CSV completos. Los identificadores se conservan como texto. Los ejemplos son filas puntuales, no una muestra representativa.','']
for d in data:
    md += [f"## {d['id']}",'',f"Archivo: `{d['file']}`. **{d['rows']:,} filas**, {len(d['columns'])} columnas.",'']
    if d['label']:
        n=int(d['label_counts'].get('1',0))
        md += [f"Etiqueta `{d['label']}`: {n:,} filas con valor 1 ({n/d['rows']*100:.4f}%).",'']
    md += ['| Campo leído | Encabezado original | Tipo lógico | Vacíos | Ejemplo |','| --- | --- | --- | ---: | --- |']
    for c in d['columns']:
        ex=str(c['examples'][0] if c['examples'] else '').replace('|','\\|')
        md.append(f"| `{c['name']}` | `{c['original_name']}` | {c['type']} | {c['nulls']:,} | {ex} |")
    md += ['']
    for c in d['columns']:
        if c['categories']:
            md += [f"### Valores de `{c['name']}`",'', '| Valor | Filas |','| --- | ---: |']
            md += [f"| {str(v).replace('|', '/')} | {n:,} |" for v,n in sorted(c['categories'].items(),key=lambda x:-x[1])]
            md += ['']
(ROOT/'data/banca/DICCIONARIO.md').write_text('\n'.join(md))
print(args.output)
