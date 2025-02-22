import * as v from 'valibot';

export const CLIENT_ENV_PREFIX = 'PUBLIC_' as const;

export const envSchema = v.object({
  PUBLIC_API_URL: v.pipe(v.string(), v.url()),
});

export const env = v.parse(envSchema, import.meta.env);
