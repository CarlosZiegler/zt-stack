import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

export interface DatabaseClientOptions {
  databaseUrl: string;
}

export type DatabaseInstance = NodePgDatabase<typeof schema>;

export const createDatabaseClient = ({
  databaseUrl,
}: DatabaseClientOptions): DatabaseInstance => {
  return drizzle({
    schema,
    casing: 'snake_case',
    connection: {
      connectionString: databaseUrl,
    },
  });
};
