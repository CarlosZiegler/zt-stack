import { createDatabaseClient } from '@repo/db/client';
import type { DatabaseInstance } from '@repo/db/client';

import { createAuth } from './server';

export interface AuthOptions {
  webUrl: string;
  authSecret: string;
  db: DatabaseInstance;
}

// this case dont need to pass db but required for type inference
const db = createDatabaseClient({
  databaseUrl: 'postgresql://postgres:postgres@localhost:5432/postgres',
});

// This is the auth instance that will be used by the CLI to generate the schema if run
export const auth = createAuth({
  webUrl: 'http://localhost:3000',
  authSecret: 'secret',
  db,
});
