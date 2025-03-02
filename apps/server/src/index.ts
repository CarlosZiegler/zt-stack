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
import { initSentry } from './lib/sentry';

const trustedOrigins = [env.PUBLIC_WEB_URL].map((url) => new URL(url).origin);

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(logger());
app.use('*', initSentry({ enabled: false }));

app.use(
  WILD_CARD_PATH.BETTER_AUTH,
  cors({
    origin: trustedOrigins,
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
    origin: trustedOrigins,
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

app.onError((e, c) => {
  const sentry = c.get('sentry');
  if (sentry) {
    sentry.captureException(e);
  }
  // TODO: Check if this is the best way to handle errors
  return c.json({ error: e.message }, 500);
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
