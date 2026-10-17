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
  assert.deepEqual(await (await handle(new Request('http://localhost/health'))).json(), { status: 'ok', service: 'mype360-backend' });
  assert.equal((await handle(new Request('http://localhost/unknown'))).status, 404);
  assert.equal((await handle(new Request('http://localhost/api/session', { method: 'POST' }))).status, 405);
});
test('configuración rechaza placeholders y claves JWKS de otro proyecto', () => {
  const env = { SUPABASE_URL: url, SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' };
  assert.equal(readConfig(env).jwks.href, `${url}/auth/v1/.well-known/jwks.json`);
  assert.throws(() => readConfig({ ...env, SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_REEMPLAZAR' }));
  assert.throws(() => readConfig({ ...env, SUPABASE_JWKS_URL: 'https://other.example/jwks' }));
});
