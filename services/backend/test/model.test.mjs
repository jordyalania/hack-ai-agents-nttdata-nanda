import { test } from 'node:test';
import assert from 'node:assert/strict';
import { explainWithModel } from '../model.mjs';
const run={version:1,policy:'commercial-demo-1',proposals:['capital','cobros','factoring'].map(product=>({product,evidence:['account-1']}))};
const env={MODEL_PROVIDER:'anthropic',MODEL_NAME:'configured-model',ANTHROPIC_API_KEY:'fixture-only-not-a-real-key'};
test('sin proveedor no afirma ejecución de modelo',async()=>{
 assert.equal((await explainWithModel(run,{})).mode,'simulado');
});
test('valida contrato y registra proveedor, modelo y referencia reales de la respuesta',async()=>{
 let request;
 const fake=async(url,options)=>{request=JSON.parse(options.body);return Response.json({id:'fixture-response',content:[{type:'tool_use',name:'explain_products',input:{proposals:run.proposals.map(p=>({...p,explanation:'Explicación ilustrativa',questions:[]}))}}]},{headers:{'request-id':'fixture-request'}});};
 const result=await explainWithModel(run,env,fake);
 assert.equal(result.mode,'modelo'); assert.equal(result.model,env.MODEL_NAME);assert.equal(result.trace.requestId,'fixture-request'); assert.equal(request.model,env.MODEL_NAME);
});
test('rechaza referencia inventada y no fabrica resultado ante errores',async()=>{
 const fake=async()=>Response.json({content:[{type:'tool_use',name:'explain_products',input:{proposals:run.proposals.map(p=>({...p,evidence:['inventada'],explanation:'No verificable',questions:[]}))}}]});
 await assert.rejects(explainWithModel(run,env,fake),/MODEL_INVALID_CONTRACT/);
 await assert.rejects(explainWithModel(run,env,async()=>new Response('',{status:429})),/MODEL_HTTP_429/);
});
