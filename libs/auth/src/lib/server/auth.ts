import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { STUDENT_ROLE } from '@sass-project/shared';
import { prisma } from '@sass-project/database';
import { sendAuthEmail } from '../email.ts';
import { readAuthEnvironment } from './environment.ts';

function createAuth() {
  const environment = readAuthEnvironment();

  return betterAuth({
    appName: 'MedPrep AI Nepal',
    baseURL: environment.baseURL,
    secret: environment.secret,
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
    ...(environment.googleClientId && environment.googleClientSecret
      ? {
          socialProviders: {
            google: {
              clientId: environment.googleClientId,
              clientSecret: environment.googleClientSecret,
            },
          },
        }
      : {}),
    user: {
      additionalFields: {
        role: {
          type: 'string',
          required: false,
          defaultValue: STUDENT_ROLE,
          input: false,
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    rateLimit: {
      enabled: true,
      window: 10,
      max: 100,
      customRules: {
        '/sign-in/email': { window: 10, max: 3 },
        '/sign-up/email': { window: 60, max: 5 },
        '/request-password-reset': { window: 60, max: 3 },
        '/send-verification-email': { window: 60, max: 3 },
      },
    },
    advanced: {
      useSecureCookies: environment.production,
    },
    trustedOrigins: environment.trustedOrigins,
  });
}

type Auth = ReturnType<typeof createAuth>;
let authInstance: Auth | undefined;

export function getAuth(): Auth {
  return (authInstance ??= createAuth());
}
