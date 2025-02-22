import {
  adminClient,
  anonymousClient,
  organizationClient,
  passkeyClient,
  usernameClient,
  twoFactorClient,
  emailOTPClient,
} from 'better-auth/client/plugins';
import { createAuthClient as createBetterAuthClient } from 'better-auth/react';

export interface AuthClientOptions {
  apiBaseUrl: string;
}

export type AuthClient = ReturnType<typeof createBetterAuthClient>;

export const createAuthClient = ({
  apiBaseUrl,
}: AuthClientOptions): AuthClient =>
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
    ],
  });
