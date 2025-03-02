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

// // THIS NOT WORKING WITH SOME PLUGINS (organizationClient) , ref => https://github.com/better-auth/better-auth/issues/100
// type AuthEmailOTPType = ReturnType<
//   typeof createBetterAuthClient<{
//     plugins: [ReturnType<typeof emailOTPClient>];
//   }>
// >;

// type AuthTwoFactorType = ReturnType<
//   typeof createBetterAuthClient<{
//     plugins: [ReturnType<typeof twoFactorClient>];
//   }>
// >;

// type AuthUsernameType = ReturnType<
//   typeof createBetterAuthClient<{
//     plugins: [ReturnType<typeof usernameClient>];
//   }>
// >;

// type AuthAnonymousType = ReturnType<
//   typeof createBetterAuthClient<{
//     plugins: [ReturnType<typeof anonymousClient>];
//   }>
// >;

// type AuthPasskeyType = ReturnType<
//   typeof createBetterAuthClient<{
//     plugins: [ReturnType<typeof passkeyClient>];
//   }>
// >;

// type AuthAdminType = ReturnType<
//   typeof createBetterAuthClient<{
//     plugins: [ReturnType<typeof adminClient>];
//   }>
// >;

// type AuthOrganizationType = ReturnType<
//   typeof createBetterAuthClient<{
//     plugins: [ReturnType<typeof organizationClient>];
//   }>
// >;

// type AuthMultiSessionType = ReturnType<
//   typeof createBetterAuthClient<{
//     plugins: [ReturnType<typeof multiSessionClient>];
//   }>
// >;

// type AuthClient2 = AuthEmailOTPType &
//   AuthTwoFactorType &
//   AuthUsernameType &
//   AuthAnonymousType &
//   AuthPasskeyType &
//   AuthAdminType &
//   AuthMultiSessionType &
//   AuthOrganizationType;

// const a = {} as AuthClient2;
