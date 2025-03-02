import { sentry, type Options } from '@hono/sentry';
import { env } from './env';

export const initSentry = (options?: Options) => {
  return sentry({
    dsn: env.SENTRY_DSN,
    // Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
    tracesSampleRate: 1.0,
    ...options,
  });
};
