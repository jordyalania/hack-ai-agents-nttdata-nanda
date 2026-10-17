export function readConfig(source = process.env) {
  const url = new URL(source.SUPABASE_URL || '');
  if (url.protocol !== 'https:' || url.pathname !== '/') {
    throw new Error('SUPABASE_URL debe ser la raíz HTTPS del proyecto.');
  }
  const key = source.SUPABASE_PUBLISHABLE_KEY || '';
  if (!key.startsWith('sb_publishable_') || /REEMPLAZAR|[•*]/.test(key)) {
    throw new Error('Configura SUPABASE_PUBLISHABLE_KEY en el entorno local.');
  }
  const jwks = new URL(source.SUPABASE_JWKS_URL || '/auth/v1/.well-known/jwks.json', url);
  if (jwks.origin !== url.origin || jwks.protocol !== 'https:') {
    throw new Error('SUPABASE_JWKS_URL debe pertenecer al mismo proyecto HTTPS.');
  }
  return { url: url.origin, publishableKeys: { default: key }, secretKeys: {}, jwks };
}
