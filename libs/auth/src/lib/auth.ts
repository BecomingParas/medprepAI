import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@sass-project/database';
import { sendAuthEmail } from './email';

function createAuth() {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error('BETTER_AUTH_SECRET must be set before using authentication.');
  }

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (Boolean(googleClientId) !== Boolean(googleClientSecret)) {
    throw new Error('Set both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google sign-in.');
  }

  const baseURL = process.env.BETTER_AUTH_URL ?? 'http://localhost:3000';

  return betterAuth({
    appName: 'MedPrep AI Nepal',
    baseURL,
    secret,
    database: prismaAdapter(prisma, { provider: 'postgresql' }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await sendAuthEmail({
          to: user.email,
          subject: 'Reset your MedPrep AI password',
          title: 'Reset your password',
          description: 'Use the secure link below to choose a new password for your account.',
          url,
          action: 'Reset password',
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendAuthEmail({
          to: user.email,
          subject: 'Verify your MedPrep AI email',
          title: 'Verify your email address',
          description: 'Confirm your email address to finish setting up your account.',
          url,
          action: 'Verify email',
        });
      },
    },
    ...(googleClientId && googleClientSecret
      ? {
          socialProviders: {
            google: {
              clientId: googleClientId,
              clientSecret: googleClientSecret,
            },
          },
        }
      : {}),
    user: {
      additionalFields: {
        role: {
          type: 'string',
          required: false,
          defaultValue: 'user',
          input: false,
        },
      },
    },
    trustedOrigins: [
      baseURL,
      ...(process.env.FRONTEND_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? []),
    ],
  });
}

type Auth = ReturnType<typeof createAuth>;
let authInstance: Auth | undefined;

export function getAuth(): Auth {
  return (authInstance ??= createAuth());
}
