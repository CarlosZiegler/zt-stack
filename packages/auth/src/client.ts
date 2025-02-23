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
      organizationClient(),
      multiSessionClient(),
    ],
  });

export type AuthClient = ReturnType<typeof createAuthClient>;
