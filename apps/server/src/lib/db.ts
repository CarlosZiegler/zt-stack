import { createDatabaseClient } from '@repo/db/client';
import { env } from './env';

const db = createDatabaseClient({ databaseUrl: env.SERVER_POSTGRES_URL });

export { db };
