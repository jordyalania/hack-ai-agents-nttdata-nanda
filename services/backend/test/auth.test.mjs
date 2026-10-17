import test from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync, sign } from 'node:crypto';
import { createApp } from '../app.mjs';
import { readConfig } from '../config.mjs';

const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const url = 'https://unit-test.supabase.co';
const jwk = { ...publicKey.export({ format: 'jwk' }), kid: 'test-key', alg: 'RS256', use: 'sig' };
const config = { url, publishableKeys: { default: 'sb_publishable_test' }, secretKeys: {}, jwks: { keys: [jwk] } };
const handle = createApp(config);
const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
function token(changes = {}, key = privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const claims = { sub: '00000000-0000-4000-8000-000000000001', role: 'authenticated', aud: 'authenticated', iss: `${url}/auth/v1`, iat: now, exp: now + 300, ...changes };
  const message = `${encode({ alg: 'RS256', kid: 'test-key', typ: 'JWT' })}.${encode(claims)}`;
  return `${message}.${sign('RSA-SHA256', Buffer.from(message), key).toString('base64url')}`;
}
const request = (jwt, extra = {}) => new Request('http://localhost/api/session', {
  headers: { ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}), ...extra },
});

test('rechaza sesión sin JWT y con solo publishable key', async () => {
  for (const req of [request(), request(null, { apikey: 'sb_publishable_test' }), request('sb_publishable_test')]) {
    assert.equal((await handle(req)).status, 401);
  }
});
test('acepta JWT firmado y devuelve solo identidad sin claves ni token', async () => {
  const jwt = token(); const response = await handle(request(jwt));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { user: { id: '00000000-0000-4000-8000-000000000001', role: 'authenticated' } });
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});
test('rechaza vencimiento, emisor, audiencia, rol y usuario anónimo incorrectos', async () => {
  for (const claims of [{ exp: 1 }, { iss: 'https://other-project.supabase.co/auth/v1' }, { aud: 'other' }, { role: 'service_role' }, { is_anonymous: true }]) {
    assert.equal((await handle(request(token(claims)))).status, 401);
  }
});
test('rechaza un token firmado por una clave no confiable', async () => {
  const other = generateKeyPairSync('rsa', { modulusLength: 2048 });
  assert.equal((await handle(request(token({}, other.privateKey)))).status, 401);
});
test('salud no revela configuración y las rutas desconocidas no se aceptan', async () => {
  assert.deepEqual(await (await handle(new Request('http://localhost/health'))).json(), { status: 'ok', service: 'crosspilot-backend' });
  assert.equal((await handle(new Request('http://localhost/unknown'))).status, 404);
  assert.equal((await handle(new Request('http://localhost/api/session', { method: 'POST' }))).status, 405);
});
test('configuración rechaza placeholders y claves JWKS de otro proyecto', () => {
  const env = { SUPABASE_URL: url, SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' };
  assert.equal(readConfig(env).jwks.href, `${url}/auth/v1/.well-known/jwks.json`);
  assert.throws(() => readConfig({ ...env, SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_REEMPLAZAR' }));
  assert.throws(() => readConfig({ ...env, SUPABASE_JWKS_URL: 'https://other.example/jwks' }));
});

test('consulta y corrige perfil mediante JWT y RPC de usuario sin cliente administrativo',async()=>{
  const { createWorkspace } = await import('../../../base-web/src/domain/copilot.ts');
  const workspace = createWorkspace(); const jwt=token(); const originalFetch=globalThis.fetch; let saved;
  globalThis.fetch=async (input,init)=>{
    const address=String(input); const headers=new Headers(init?.headers);
    assert.equal(headers.get('authorization'),`Bearer ${jwt}`);
    if(address.includes('/rest/v1/mype_workspaces'))return Response.json({body:workspace,revision:1});
    if(address.includes('/rest/v1/rpc/mype_save_workspace')) {saved=JSON.parse(init.body);return Response.json(2);}
    throw new Error('Unexpected external call');
  };
  try {
    const base='http://localhost/api/businesses/business-1/profile';
    const get=await handle(new Request(base,{headers:{Authorization:`Bearer ${jwt}`}}));assert.equal(get.status,200);
    assert.equal((await get.json()).business.name,'Bodega Doña Rosa');
    const patch=await handle(new Request(base,{method:'PATCH',headers:{Authorization:`Bearer ${jwt}`,'Content-Type':'application/json'},body:JSON.stringify({expectedVersion:1,patch:{need:'cobros'},sourceMessageId:'initial-business-1'})}));
    assert.equal(patch.status,200);assert.equal((await patch.json()).business.version,2);
    assert.equal(saved.expected_revision,1);assert.equal(saved.document.runs[0].selected,'cobros');
    const stale=await handle(new Request(base,{method:'PATCH',headers:{Authorization:`Bearer ${jwt}`},body:JSON.stringify({expectedVersion:0,patch:{need:'cobros'}})}));assert.equal(stale.status,409);
  } finally {globalThis.fetch=originalFetch;}
});
