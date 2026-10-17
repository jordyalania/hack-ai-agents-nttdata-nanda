#!/usr/bin/env python3
"""Descarga SAML-D completo y las variantes IBM HI/LI Small, sin credenciales."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen
from urllib.parse import quote
import json, zipfile, shutil, hashlib, time
ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data/banca'
DATA.mkdir(parents=True, exist_ok=True)
SOURCES = {
 'ibm-aml': ('ealtman2019/ibm-transactions-for-anti-money-laundering-aml',8,
             [f'{group}-Small_{suffix}' for group in ['HI','LI'] for suffix in ['Trans.csv','accounts.csv','Patterns.txt']]),
 'saml-d': ('berkanoztas/synthetic-transaction-monitoring-dataset-aml',2,['SAML-D.csv'])
}
def download(task):
    name,slug,version,filename = task
    folder = DATA/'raw'/name
    folder.mkdir(parents=True,exist_ok=True)
    target = folder/filename
    meta = json.loads((DATA/'metadata'/f'{name}-files.json').read_text())
    size = next(f['totalBytes'] for f in meta['datasetFiles'] if f['name']==filename)
    url = f'https://www.kaggle.com/api/v1/datasets/download/{slug}/{quote(filename)}?datasetVersionNumber={version}'
    if not target.exists() or target.stat().st_size != size:
        archive = folder/(filename+'.download')
        for attempt in range(3):
            try:
                print(f'Descargando {filename} ({size/1e6:.1f} MB sin comprimir)',flush=True)
                with urlopen(url,timeout=90) as response, archive.open('wb') as out:
                    shutil.copyfileobj(response,out,1024*1024)
                if zipfile.is_zipfile(archive):
                    with zipfile.ZipFile(archive) as z:
                        member = next(n for n in z.namelist() if Path(n).name==filename)
                        with z.open(member) as inp,target.open('wb') as out: shutil.copyfileobj(inp,out,1024*1024)
                    archive.unlink()
                else: archive.replace(target)
                if target.stat().st_size != size: raise ValueError(f'Tamaño inesperado de {filename}: {target.stat().st_size} != {size}')
                break
            except Exception:
                if attempt==2: raise
                time.sleep(2)
    digest=hashlib.sha256()
    with target.open('rb') as f:
        for chunk in iter(lambda:f.read(4*1024*1024),b''): digest.update(chunk)
    print(f'OK {filename}: {target.stat().st_size:,} bytes',flush=True)
    return dict(dataset=name,file=str(target.relative_to(ROOT)),bytes=target.stat().st_size,sha256=digest.hexdigest(),url=url,version=version)
if __name__=='__main__':
    tasks=[(name,slug,version,f) for name,(slug,version,files) in SOURCES.items() for f in files]
    with ThreadPoolExecutor(max_workers=3) as pool: results=list(pool.map(download,tasks))
    (DATA/'metadata/download-manifest.json').write_text(json.dumps(results,indent=2)+'\n')
    print('Descarga completa y manifiesto SHA-256 generado.',flush=True)
