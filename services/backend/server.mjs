import { createServer } from 'node:http';
import { readConfig } from './config.mjs';
import { createApp } from './app.mjs';

const port = Number(process.env.BACKEND_PORT || 8787);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('BACKEND_PORT inválido.');
const handle = createApp(readConfig());
const server = createServer(async (incoming, outgoing) => {
  try {
    const headers = new Headers();
    for (const [name, values] of Object.entries(incoming.headers)) {
      for (const value of Array.isArray(values) ? values : [values]) {
        if (value !== undefined) headers.append(name, value);
      }
    }
    const chunks = []; let size = 0;
    for await (const chunk of incoming) {
      size += chunk.length;
      if (size > 32768) { outgoing.writeHead(413); outgoing.end('Body too large'); return; }
      chunks.push(chunk);
    }
    const request = new Request(new URL(incoming.url, `http://127.0.0.1:${port}`), {
      method: incoming.method, headers, ...(['GET','HEAD'].includes(incoming.method) ? {} : { body: Buffer.concat(chunks) }),
    });
    const response = await handle(request);
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(incoming.method === 'HEAD' ? undefined : Buffer.from(await response.arrayBuffer()));
  } catch {
    outgoing.writeHead(500, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    outgoing.end('{"error":"INTERNAL_ERROR"}');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Mype360 backend: http://127.0.0.1:${port}`));
