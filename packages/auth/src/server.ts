import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { DatabaseInstance } from '@repo/db/client';
import {
  admin,
  anonymous,
  emailOTP,
  organization,
  twoFactor,
  username,
} from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';

export interface AuthOptions {
  webUrl: string;
  authSecret: string;
  db: DatabaseInstance;
}

export type AuthInstance = ReturnType<typeof betterAuth>;

export const createAuth = ({
  webUrl,
  db,
  authSecret,
}: AuthOptions): AuthInstance => {
  return betterAuth({
    secret: authSecret,
    trustedOrigins: [webUrl],
    appUrl: 'my-app',
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds
      },
    },

    database: drizzleAdapter(db, {
      provider: 'pg',
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
    },
    plugins: [
      twoFactor(),
      username(),
      anonymous(),
      passkey(),
      admin(),
      organization(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          // Implement the sendVerificationOTP method to send the OTP to the user's email address
        },
      }),
    ],
  });
};
