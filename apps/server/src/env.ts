import * as z from 'zod';

const DEFAULT_SERVER_PORT = 3035;
const DEFAULT_SERVER_HOST = 'localhost';

const createPortSchema = ({ defaultPort }: { defaultPort: number }) =>
  z.preprocess(
    (val) => (val === undefined ? `${defaultPort}` : val),
    z
      .string()
      .transform((s) => parseInt(s, 10))
      .pipe(z.number().min(0).max(65535)),
  );

export const envSchema = z.object({
  SERVER_PORT: createPortSchema({ defaultPort: DEFAULT_SERVER_PORT }),
  SERVER_HOST: z.string().min(1).default(DEFAULT_SERVER_HOST),
  SERVER_AUTH_SECRET: z.string().min(1),
  SERVER_POSTGRES_URL: z.string(),

  // Frontend URL, used to configure trusted origin (CORS)
  PUBLIC_WEB_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
