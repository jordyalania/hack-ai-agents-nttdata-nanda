#!/usr/bin/env python3
"""Perfil por bloques: conserva IDs como texto y calcula conteos sobre archivos completos."""
from pathlib import Path
from collections import Counter
import csv,json
import pandas as pd
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data/banca'
CATEGORIES={'Payment Format','Payment Currency','Receiving Currency','Is Laundering','Payment_type','Payment_currency','Received_currency','Sender_bank_location','Receiver_bank_location','Is_laundering','Laundering_type'}
AMOUNTS={'Amount Received','Amount Paid','Amount'}
def profile(path):
    with path.open() as f: header=next(csv.reader(f))
    columns=list(pd.read_csv(path,nrows=0).columns)
    counts={c:Counter() for c in columns if c in CATEGORIES}
    nulls=Counter(); ranges={}; examples={}; rows=0; samples=[]; suspicious=[]
    label=next((c for c in columns if c in {'Is Laundering','Is_laundering'}),None)
    for chunk in pd.read_csv(path,dtype=str,keep_default_na=False,chunksize=100000):
        rows+=len(chunk)
        if len(samples)<3: samples.extend(chunk.head(3-len(samples)).to_dict('records'))
        if label and len(suspicious)<5:
            suspicious.extend(chunk[chunk[label]=='1'].head(5-len(suspicious)).to_dict('records'))
        for c in columns:
            s=chunk[c]; nulls[c]+=int((s=='').sum())
            if c not in examples: examples[c]=list(s[s!=''].drop_duplicates().head(3))
            if c in counts: counts[c].update({str(k):int(v) for k,v in s.value_counts().items()})
            if c in AMOUNTS:
                n=pd.to_numeric(s,errors='coerce'); lo,hi=float(n.min()),float(n.max())
                prev=ranges.get(c,[lo,hi]); ranges[c]=[min(prev[0],lo),max(prev[1],hi)]
            if c in {'Timestamp','Date'}:
                lo,hi=str(s.min()),str(s.max()); prev=ranges.get(c,[lo,hi]); ranges[c]=[min(prev[0],lo),max(prev[1],hi)]
    schema=[]
    for i,c in enumerate(columns):
        kind='importe decimal' if c in AMOUNTS else 'etiqueta (0/1)' if c==label else 'fecha/hora' if c in {'Timestamp','Date','Time'} else 'etiqueta de tipología' if c=='Laundering_type' else 'categoría' if c in CATEGORIES else 'identificador (texto)' if c in {'From Bank','To Bank','Account','Account.1','Bank ID','Account Number','Entity ID','Sender_account','Receiver_account'} else 'texto'
        schema.append(dict(name=c,original_name=header[i],type=kind,nulls=nulls[c],examples=examples.get(c,[]),range=ranges.get(c),categories=dict(counts[c]) if c in counts else None))
    result=dict(id=path.stem,file=str(path.relative_to(ROOT)),rows=rows,bytes=path.stat().st_size,columns=schema,label=label,label_counts=dict(counts.get(label,{})),examples=samples,suspicious_examples=suspicious)
    print(path.name,rows,'filas',len(schema),'columnas',result['label_counts'],flush=True)
    return result
if __name__=='__main__':
    results=[]
    for name in ['ibm-aml','saml-d']:
        for p in sorted((DATA/'raw'/name).glob('*.csv')): results.append(profile(p))
    (DATA/'metadata/profiles.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
