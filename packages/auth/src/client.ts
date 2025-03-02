import {
  adminClient,
  anonymousClient,
  organizationClient,
  passkeyClient,
  usernameClient,
  twoFactorClient,
  emailOTPClient,
  multiSessionClient,
} from 'better-auth/client/plugins';
import { createAuthClient as createBetterAuthClient } from 'better-auth/react';
// import { stripeClient } from '@better-auth/stripe/client';
// import { apiKeyClient } from 'better-auth/client/plugins';
export interface AuthClientOptions {
  apiBaseUrl: string;
}

export const createAuthClient = ({ apiBaseUrl }: AuthClientOptions) =>
  createBetterAuthClient({
    baseURL: apiBaseUrl,
    plugins: [
      emailOTPClient(),
      twoFactorClient(),
      usernameClient(),
      anonymousClient(),
      passkeyClient(),
      adminClient(),
      organizationClient({
        teams: {
          enabled: true,
        },
      }),
      multiSessionClient(),
      // stripeClient({
      //   subscription: true, //if you want to enable subscription management
      // }),
      // apiKeyClient(),
    ],
  });

export type AuthClient = ReturnType<typeof createAuthClient>;
