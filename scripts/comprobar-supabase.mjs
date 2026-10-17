import { readConfig } from '../services/backend/config.mjs';
const config = readConfig();
let failed = false;
for (const [name, path, keyed] of [
  ['JWKS', '/auth/v1/.well-known/jwks.json', false],
  ['Auth settings', '/auth/v1/settings', true],
]) {
  try {
    const response = await fetch(new URL(path, config.url), {
      headers: keyed ? { apikey: config.publishableKeys.default } : {},
      signal: AbortSignal.timeout(15000),
    });
    console.log(`${name}: HTTP ${response.status}`);
    if (!response.ok) { failed = true; continue; }
    const data = await response.json();
    if (name === 'JWKS') {
      const count = Array.isArray(data.keys) ? data.keys.length : 0;
      console.log(`Claves públicas de firma disponibles: ${count}`);
      if (!count) { console.log('JWT por JWKS pendiente: el proyecto no publicó claves asimétricas.'); failed = true; }
    }
  } catch (error) {
    console.log(`${name}: ${error.cause?.code || error.name}`);
    failed = true;
  }
}
console.log('Comprobación de solo lectura; no verifica tablas, RLS ni una sesión real de asesor.');
process.exitCode = failed ? 1 : 0;
