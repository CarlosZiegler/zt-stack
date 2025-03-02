import * as z from 'zod';

export const envSchema = z.object({
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_EMAIL: z.string().optional().default('delivered@resend.dev'),
  TEST_EMAIL: z.string().optional().default(''),
});

export const env = envSchema.parse(process.env);
