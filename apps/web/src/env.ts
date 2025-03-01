import * as z from 'zod';

export const CLIENT_ENV_PREFIX = 'PUBLIC_' as const;

export const envSchema = z.object({
  PUBLIC_API_URL: z.string().url(),
  PUBLIC_BASE_PATH: z.string().optional().default('/'),
});

export const env = envSchema.parse(import.meta.env);
