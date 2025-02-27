import { serve } from '@hono/node-server';
import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { api } from './lib/api';
import { auth } from './lib/auth';
import { WILD_CARD_PATH } from './lib/constants';
import { env } from './lib/env';
import { showRoutes } from 'hono/dev';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(logger());

app.use(
  WILD_CARD_PATH.BETTER_AUTH,
  cors({
    origin: [env.PUBLIC_WEB_URL],
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

app.use(
  WILD_CARD_PATH.TRPC,
  cors({
    origin: [env.PUBLIC_WEB_URL],
    credentials: true,
  }),
);

app.on(['POST', 'GET'], WILD_CARD_PATH.BETTER_AUTH, (c) =>
  auth.handler(c.req.raw),
);

app.use(
  WILD_CARD_PATH.TRPC,
  trpcServer({
    router: api.trpcRouter,
    createContext: (c) => api.createTRPCContext({ headers: c.req.headers }),
  }),
);

app.get('/healthcheck', (c) => {
  return c.text('OK');
});

const server = serve(
  {
    fetch: app.fetch,
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
  },
  (info) => {
    const host = info.family === 'IPv6' ? `[${info.address}]` : info.address;
    console.log(`Hono internal server: http://${host}:${info.port}`);
    showRoutes(app, {
      verbose: true,
    });
  },
);

const shutdown = () => {
  server.close((error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('\nServer has stopped gracefully.');
    }
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
