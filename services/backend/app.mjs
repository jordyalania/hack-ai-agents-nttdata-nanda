import { fromSupabaseUrl } from '@supabase/server';
import { verifyAuth, createContextClient } from '@supabase/server/core';

const json = (value, status = 200) => Response.json(value, {
  status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});

export function createApp(config) {
  return async function handle(request) {
    const path = new URL(request.url).pathname;
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    if (path === '/health') return json({ status: 'ok', service: 'mype360-backend' });
    if (path !== '/api/session') return json({ error: 'NOT_FOUND' }, 404);
    try {
      const { data: auth, error } = await verifyAuth(request, {
        auth: 'user', issuer: fromSupabaseUrl(config.url),
        audience: 'authenticated', env: config,
      });
      if (error) {
        return json({ error: error.status >= 500 ? 'AUTH_UNAVAILABLE' : 'UNAUTHORIZED' }, error.status >= 500 ? 503 : 401);
      }
      if (!auth.userClaims?.id || auth.jwtClaims?.role !== 'authenticated' || auth.jwtClaims?.is_anonymous === true) {
        return json({ error: 'UNAUTHORIZED' }, 401);
      }
      // Construct the user-scoped client; no admin client or database query here.
      createContextClient({ auth: { token: auth.token, keyName: auth.keyName }, env: config });
      return json({ user: { id: auth.userClaims.id, role: auth.userClaims.role } });
    } catch {
      return json({ error: 'AUTH_UNAVAILABLE' }, 503);
    }
  };
}
