import { fromSupabaseUrl } from '@supabase/server';
import { verifyAuth, createContextClient } from '@supabase/server/core';
import { analyze, correct, profile, validateDataset, workspaceSchema } from '../../base-web/src/domain/copilot.ts';
import { explainWithModel } from './model.mjs';

const json = (value, status = 200) => Response.json(value, {
  status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});

export function createApp(config) {
  return async function handle(request) {
    const path = new URL(request.url).pathname;
    const match = path.match(/^\/api\/businesses\/([^/]+)\/(profile|analysis)$/);
    if (!['GET', 'HEAD'].includes(request.method) && !(match && request.method === 'PATCH' && match[2] === 'profile')) {
      return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    if (path === '/health') return json({ status: 'ok', service: 'mype360-backend' });
    if (path !== '/api/session' && !match) return json({ error: 'NOT_FOUND' }, 404);
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
      const client = createContextClient({ auth: { token: auth.token, keyName: auth.keyName }, env: config });
      if (!match) return json({ user: { id: auth.userClaims.id, role: auth.userClaims.role } });
      const { data: saved, error: readError } = await client.from('mype_workspaces').select('body,revision').maybeSingle();
      if (readError) return json({ error: 'WORKSPACE_UNAVAILABLE' }, 503);
      if (!saved) return json({ error: 'WORKSPACE_NOT_FOUND' }, 404);
      let workspace;
      try { workspace = workspaceSchema.parse(saved.body); validateDataset(workspace.dataset); }
      catch { return json({ error: 'WORKSPACE_INVALID' }, 422); }
      const business = workspace.dataset.businesses.find(b => b.id === decodeURIComponent(match[1]));
      if (!business) return json({ error: 'BUSINESS_NOT_FOUND' }, 404);
      if (request.method === 'PATCH') {
        let input;
        try {
          const raw = await request.text();
          if (raw.length > 32768) return json({ error: 'BODY_TOO_LARGE' }, 413);
          input = JSON.parse(raw);
          if (input.expectedVersion !== business.version) return json({ error: 'PROFILE_CONFLICT' }, 409);
          workspace = correct(workspace, business.id, input.patch, auth.userClaims.id, input.sourceMessageId ?? null);
        } catch { return json({ error: 'INVALID_CORRECTION' }, 400); }
        const updated = workspace.dataset.businesses.find(b => b.id === business.id);
        workspace.runs.push(analyze(workspace.dataset, updated));
        const { data: revision, error: saveError } = await client.rpc('mype_save_workspace', { document: workspace, expected_revision: saved.revision });
        if (saveError) return json({ error: saveError.message.includes('CONFLICT') ? 'WORKSPACE_CONFLICT' : 'SAVE_FAILED' }, saveError.message.includes('CONFLICT') ? 409 : 503);
        return json({ business: updated, profile: profile(workspace.dataset, updated), revision });
      }
      if (match[2] === 'analysis') {
        const run = analyze(workspace.dataset, business);
        try { return json({ run, model: await explainWithModel(run) }); }
        catch (error) { return json({ run, model: { mode: 'error', proposals: [], error: error instanceof Error ? error.message : 'MODEL_FAILED' } }, 502); }
      }
      return json({ business, profile: profile(workspace.dataset, business), revision: saved.revision });
    } catch {
      return json({ error: 'AUTH_UNAVAILABLE' }, 503);
    }
  };
}
