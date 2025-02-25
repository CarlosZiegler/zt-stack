import { createAuth } from '@repo/auth/server';
import { env } from './env';
import { db } from './db';

const auth = createAuth({
  authSecret: env.SERVER_AUTH_SECRET,
  db,
  webUrl: env.PUBLIC_WEB_URL,
});

export { auth };
