import { emailClient } from '@repo/email/lib/client';
import { reactInvitationEmail } from '@repo/email/templates/invitation';
import { reactResetPasswordEmail } from '@repo/email/templates/reset-password';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import {
  admin,
  anonymous,
  bearer,
  emailOTP,
  multiSession,
  oneTap,
  openAPI,
  organization,
  twoFactor,
  username,
} from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';
import type { DatabaseInstance } from '@repo/db/client';
import { env } from './env';
// import { captcha } from 'better-auth/plugins';
// import { stripe } from '@better-auth/stripe';
// import Stripe from 'stripe';
// import { apiKey } from 'better-auth/plugins';

// const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export interface AuthOptions {
  webUrl: string;
  authSecret: string;
  db: DatabaseInstance;
}

export type AuthInstance = ReturnType<typeof betterAuth>;

const from = env.BETTER_AUTH_EMAIL;
const devEmail = env.TEST_EMAIL;

export const createAuth = ({
  webUrl,
  db,
  authSecret,
}: AuthOptions): AuthInstance => {
  return betterAuth({
    secret: authSecret,
    trustedOrigins: [webUrl].map((url) => new URL(url).origin),
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
    account: {
      accountLinking: {
        trustedProviders: ['google', 'github', 'demo-app'],
      },
    },
    emailVerification: {
      async sendVerificationEmail({ user, url }) {
        const res = await emailClient.emails.send({
          from,
          to: devEmail || user.email,
          subject: 'Verify your email address',
          html: `<a href="${url}">Verify your email address</a>`,
        });
        console.log(res, user.email);
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
      async sendResetPassword({ user, url }) {
        await emailClient.emails.send({
          from,
          to: user.email,
          subject: 'Reset your password',
          react: reactResetPasswordEmail({
            username: user.email,
            resetLink: url,
          }),
        });
      },
    },
    plugins: [
      twoFactor({
        otpOptions: {
          async sendOTP({ user, otp }) {
            await emailClient.emails.send({
              from,
              to: user.email,
              subject: 'Your OTP',
              html: `Your OTP is ${otp}`,
            });
          },
        },
      }),
      username(),
      anonymous(),
      passkey(),
      admin(),
      organization({
        async sendInvitationEmail(data) {
          await emailClient.emails.send({
            from,
            to: data.email,
            subject: "You've been invited to join an organization",
            react: reactInvitationEmail({
              username: data.email,
              invitedByUsername: data.inviter.user.name,
              invitedByEmail: data.inviter.user.email,
              teamName: data.organization.name,
              inviteLink:
                process.env.NODE_ENV === 'development'
                  ? `http://localhost:3000/accept-invitation/${data.id}`
                  : `${
                      process.env.BETTER_AUTH_URL ||
                      'https://demo.better-auth.com'
                    }/accept-invitation/${data.id}`,
            }),
          });
        },
      }),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          // Implement the sendVerificationOTP method to send the OTP to the user's email address
        },
      }),
      openAPI(),
      bearer(),
      multiSession(),
      oneTap(),
      // captcha({
      //   provider: 'cloudflare-turnstile', // or "google-recaptcha" //
      //   secretKey: process.env.TURNSTILE_SECRET_KEY!,
      // }),
      // stripe({
      //   stripeClient,
      //   stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      //   createCustomerOnSignUp: true,
      // }),
      // apiKey(),
    ],
  });
};
