'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { Eye, EyeOff, GraduationCap, LoaderCircle, Stethoscope } from 'lucide-react';
import { useForm, type FieldErrors, type Resolver } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { useAuth } from '@/hooks/useAuth';

type AuthMode =
  | 'login'
  | 'register'
  | 'forgot'
  | 'verify'
  | 'reset'
  | 'verified'
  | 'auth-error'
  | 'forgot-sent'
  | 'verify-sent'
  | 'reset-done';

type AuthValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schemas = {
  login: z.object({
    email: z.string().trim().email('Enter a valid email address.').max(254),
    password: z.string().min(1, 'Enter your password.').max(128),
  }),
  register: z
    .object({
      name: z.string().trim().min(2, 'Enter your name.').max(80, 'Name must be 80 characters or fewer.'),
      email: z.string().trim().email('Enter a valid email address.').max(254),
      password: z.string().min(8, 'Use at least 8 characters.').max(128, 'Password is too long.'),
      confirmPassword: z.string().min(1, 'Confirm your password.'),
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    }),
  email: z.object({
    email: z.string().trim().email('Enter a valid email address.').max(254),
  }),
  reset: z
    .object({
      password: z.string().min(8, 'Use at least 8 characters.').max(128, 'Password is too long.'),
      confirmPassword: z.string().min(1, 'Confirm your password.'),
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    }),
};

function safeRedirectPath(path: string | null): string {
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.includes('\\')) {
    return '/dashboard';
  }
  return path;
}

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const flow = searchParams.get('flow');
  const token = searchParams.get('token');
  const next = safeRedirectPath(searchParams.get('next'));
  const nextQuery = next === '/dashboard' ? '' : `&next=${encodeURIComponent(next)}`;
  const queryError = searchParams.get('error');
  const requestedMode = searchParams.get('mode');
  const initialEmail = searchParams.get('email') ?? '';
  const [mode, setMode] = useState<AuthMode>('login');
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState('');
  const [notice, setNotice] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === 'true';

  const resolver = useMemo<Resolver<AuthValues>>(
    () => async (values) => {
      const schema =
        mode === 'login'
          ? schemas.login
          : mode === 'register'
            ? schemas.register
            : mode === 'forgot' || mode === 'verify'
              ? schemas.email
              : mode === 'reset'
                ? schemas.reset
                : schemas.login;
      const result = schema.safeParse(values);
      if (result.success) return { values, errors: {} };

      const errors: FieldErrors<AuthValues> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (
          field === 'name' ||
          field === 'email' ||
          field === 'password' ||
          field === 'confirmPassword'
        ) {
          errors[field] = { type: 'validation', message: issue.message };
        }
      }
      return { values: {}, errors };
    },
    [mode],
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<AuthValues>({
    resolver,
    defaultValues: {
      name: '',
      email: initialEmail,
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (queryError) {
      setMode('auth-error');
      setServerError('That sign-in or email link could not be completed. Request a new link or try signing in again.');
      return;
    }
    if (flow === 'reset') {
      setMode('reset');
      return;
    }
    if (flow === 'verified') {
      setMode('verified');
      return;
    }
    if (flow === 'oauth') {
      if (loading) return;
      if (user) {
        router.replace(next);
        router.refresh();
      } else {
        setServerError('We could not complete sign in with Google. Try again or use email and password.');
        setMode('login');
      }
      return;
    }
    setMode(requestedMode === 'register' ? 'register' : 'login');
  }, [flow, loading, next, queryError, requestedMode, router, user]);

  useEffect(() => {
    document.title = `${mode === 'register' ? 'Create account' : mode === 'forgot' ? 'Forgot password' : mode === 'reset' ? 'Reset password' : mode === 'verify' ? 'Verify email' : 'Sign in'} | MedPrep AI`;
  }, [mode]);

  useEffect(() => {
    const authFlow =
      flow === 'verified' ||
      flow === 'oauth' ||
      flow === 'reset' ||
      Boolean(queryError);
    if (user && !loading && !authFlow) {
      router.replace(next);
    }
  }, [flow, loading, next, queryError, router, user]);

  function changeMode(nextMode: AuthMode) {
    setServerError('');
    setNotice('');
    setMode(nextMode);
    reset({ ...getValues(), password: '', confirmPassword: '' });
  }

  async function submit(values: AuthValues) {
    setBusy(true);
    setServerError('');
    setNotice('');

    try {
      if (mode === 'login') {
        const { error } = await authClient.signIn.email({
          email: values.email,
          password: values.password,
          rememberMe: true,
        });
        if (error) {
          if (error.status === 403) {
            setMode('verify');
            setServerError('Please verify your email address before signing in.');
            return;
          }
          setServerError('We could not sign you in. Check your email and password, then try again.');
          return;
        }
        router.replace(next);
        router.refresh();
        return;
      }

      if (mode === 'register') {
        const { error } = await authClient.signUp.email({
          name: values.name,
          email: values.email,
          password: values.password,
          callbackURL: `/login?flow=verified${nextQuery}`,
        });
        if (error) {
          setServerError('We could not create your account. Check your details and try again.');
          return;
        }
        setValue('email', values.email);
        setMode('verify-sent');
        setNotice('If your account needs verification, a link will be sent to your email.');
        return;
      }

      if (mode === 'forgot') {
        const { error } = await authClient.requestPasswordReset({
          email: values.email,
          redirectTo: `/login?flow=reset${nextQuery}`,
        });
        if (error) {
          setServerError('We could not process that request. Please try again later.');
          return;
        }
        setMode('forgot-sent');
        setNotice('If an account exists for that email, a password reset link will be sent.');
        return;
      }

      if (mode === 'verify') {
        const { error } = await authClient.sendVerificationEmail({
          email: values.email,
          callbackURL: `/login?flow=verified${nextQuery}`,
        });
        if (error) {
          setServerError('We could not send a verification link. Please try again later.');
          return;
        }
        setMode('verify-sent');
        setNotice('If an account needs verification, a new link will be sent.');
        return;
      }

      if (mode === 'reset') {
        if (!token) {
          setServerError('This reset link is invalid or incomplete. Request a new link to continue.');
          return;
        }
        const { error } = await authClient.resetPassword({
          newPassword: values.password,
          token,
        });
        if (error) {
          setServerError('This reset link may have expired. Request a new one and try again.');
          return;
        }
        setMode('reset-done');
        setNotice('Your password has been updated. Sign in with your new password.');
      }
    } catch {
      setServerError('Authentication is temporarily unavailable. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function signInWithGoogle() {
    setGoogleBusy(true);
    setServerError('');
    try {
      const callbackURL = `/login?flow=oauth&next=${encodeURIComponent(next)}`;
      const { error } = await authClient.signIn.social({ provider: 'google', callbackURL });
      if (error) setServerError('We could not start Google sign in. Please try again.');
    } catch {
      setServerError('We could not start Google sign in. Please try again.');
    } finally {
      setGoogleBusy(false);
    }
  }

  const password = watch('password');
  const passwordScore = [
    password.length >= 8,
    password.length >= 12,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password),
  ].filter(Boolean).length;
  const strengthLabel =
    passwordScore < 2 ? 'Weak' : passwordScore < 3 ? 'Fair' : passwordScore < 4 ? 'Good' : 'Strong';
  const strengthColor =
    passwordScore < 2
      ? 'bg-destructive'
      : passwordScore < 3
        ? 'bg-warning'
        : passwordScore < 4
          ? 'bg-accent'
          : 'bg-success';
  const emailField = register('email');
  const nameField = register('name');
  const passwordField = register('password');
  const confirmationField = register('confirmPassword');
  const showEmail = ['login', 'register', 'forgot', 'verify'].includes(mode);
  const showPasswordField = ['login', 'register', 'reset'].includes(mode);
  const title =
    mode === 'register'
      ? 'Create your account'
      : mode === 'forgot'
        ? 'Forgot your password?'
        : mode === 'verify'
          ? 'Verify your email'
          : mode === 'reset'
            ? 'Choose a new password'
            : mode === 'verified'
              ? 'Email verified'
              : mode === 'reset-done'
                ? 'Password updated'
                : mode === 'auth-error'
                  ? 'We couldn’t complete that request'
                : mode === 'forgot-sent' || mode === 'verify-sent'
                  ? 'Check your inbox'
                  : 'Welcome back';
  const description =
    mode === 'register'
      ? 'Create an account to save your study progress and plan.'
      : mode === 'forgot'
        ? 'Enter your account email and we’ll send a secure reset link.'
        : mode === 'verify'
          ? 'Verify your email address to finish setting up your account.'
          : mode === 'reset'
            ? 'Choose a new password for your MedPrep AI account.'
            : mode === 'verified'
              ? 'Your email address has been verified. You can continue to your learning workspace.'
              : mode === 'reset-done'
                ? 'Your password has been updated. You can now sign in.'
                : mode === 'auth-error'
                  ? 'That sign-in or email link is invalid or has expired. You can request a new email link or sign in again.'
                : mode === 'forgot-sent' || mode === 'verify-sent'
                  ? 'Follow the instructions sent to your email address.'
                  : 'Sign in to continue your study plan and keep your progress together.';

  return (
    <main id="main-content" className="mx-auto flex min-h-[65vh] w-full max-w-6xl items-center px-5 py-10 sm:px-8">
      <div className="mx-auto grid w-full overflow-hidden rounded-xl border bg-card shadow-card md:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-hero p-8 text-navy-foreground md:flex lg:p-10">
          <div className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-20 size-72 rounded-full border border-white/10" />
          <Link href="/home" className="relative flex items-center gap-3 font-display text-lg font-extrabold">
            <span className="grid size-10 place-items-center rounded-lg bg-white/10">
              <Stethoscope className="size-5 text-hero-accent" />
            </span>
            <span>MedPrep <span className="text-hero-accent">AI</span></span>
          </Link>
          <div className="relative py-10">
            <GraduationCap className="size-9 text-hero-accent" strokeWidth={1.6} />
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-hero-accent">
              Medical entrance preparation
            </p>
            <p className="mt-3 font-display text-2xl font-bold leading-snug">
              Your next step toward a future in healthcare.
            </p>
            <p className="mt-3 text-sm leading-6 text-navy-foreground/75">
              Keep your practice, progress and study plan together in one place.
            </p>
          </div>
          <p className="relative text-xs text-navy-foreground/60">NEPAL · MECEE-BL</p>
        </aside>

        <section className="p-6 sm:p-9 lg:p-12">
          <Link href="/home" className="font-display text-sm font-extrabold md:hidden">
            MedPrep <span className="text-primary">AI</span>
          </Link>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-accent">
            Your learning workspace
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>

          {googleEnabled && (mode === 'login' || mode === 'register') && (
            <>
              <Button
                type="button"
                variant="outline"
                className="mt-6 w-full"
                disabled={googleBusy}
                onClick={() => void signInWithGoogle()}
              >
                {googleBusy ? 'Connecting…' : 'Continue with Google'}
              </Button>
              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex-1 border-t" />or continue with email<span className="flex-1 border-t" />
              </div>
            </>
          )}

          {mode === 'verified' || mode === 'reset-done' || mode === 'auth-error' ? (
            <Button className="mt-6 w-full" onClick={() => mode === 'verified' && user ? router.replace(next) : changeMode('login')}>
              {mode === 'verified' && user ? 'Open workspace' : 'Continue to sign in'}
            </Button>
          ) : mode === 'forgot-sent' || mode === 'verify-sent' ? (
            <div className="mt-6 space-y-4">
              <p role="status" className="rounded-md border bg-muted/40 p-4 text-sm leading-6">{notice}</p>
              {mode === 'verify-sent' && (
                <Button type="button" variant="outline" className="w-full" onClick={() => changeMode('login')}>
                  Back to sign in
                </Button>
              )}
            </div>
          ) : (
            <form className="mt-6 space-y-4" noValidate onSubmit={(event: FormEvent<HTMLFormElement>) => void handleSubmit(submit)(event)}>
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label htmlFor="auth-name" className="text-sm font-medium">Full name</label>
                  <Input
                    id="auth-name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'auth-name-error' : undefined}
                    {...nameField}
                  />
                  {errors.name && <p id="auth-name-error" role="alert" className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
              )}

              {showEmail && (
                <div className="space-y-1.5">
                  <label htmlFor="auth-email" className="text-sm font-medium">Email</label>
                  <Input
                    id="auth-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'auth-email-error' : undefined}
                    {...emailField}
                  />
                  {errors.email && <p id="auth-email-error" role="alert" className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
              )}

              {showPasswordField && (
                <div className="space-y-1.5">
                  <label htmlFor="auth-password" className="text-sm font-medium">
                    {mode === 'reset' ? 'New password' : 'Password'}
                  </label>
                  <div className="relative">
                    <Input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? 'auth-password-error' : undefined}
                      className="pr-11"
                      {...passwordField}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((visible) => !visible)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  {errors.password && <p id="auth-password-error" role="alert" className="text-xs text-destructive">{errors.password.message}</p>}
                  {(mode === 'register' || mode === 'reset') && password && (
                    <div className="space-y-1.5" aria-live="polite">
                      <div className="h-1 overflow-hidden rounded-full bg-muted" role="meter" aria-label="Password strength" aria-valuemin={0} aria-valuemax={5} aria-valuenow={passwordScore} aria-valuetext={strengthLabel}>
                        <div className={`h-full rounded-full ${strengthColor}`} style={{ width: `${Math.max(1, (passwordScore / 5) * 100)}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground">Password strength: {strengthLabel}</p>
                    </div>
                  )}
                </div>
              )}

              {(mode === 'register' || mode === 'reset') && (
                <div className="space-y-1.5">
                  <label htmlFor="auth-confirm-password" className="text-sm font-medium">Confirm password</label>
                  <div className="relative">
                    <Input
                      id="auth-confirm-password"
                      type={showConfirmation ? 'text' : 'password'}
                      autoComplete="new-password"
                      aria-invalid={Boolean(errors.confirmPassword)}
                      aria-describedby={errors.confirmPassword ? 'auth-confirm-password-error' : undefined}
                      className="pr-11"
                      {...confirmationField}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0"
                      aria-label={showConfirmation ? 'Hide password confirmation' : 'Show password confirmation'}
                      onClick={() => setShowConfirmation((visible) => !visible)}
                    >
                      {showConfirmation ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p id="auth-confirm-password-error" role="alert" className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-medium text-primary underline-offset-4 hover:underline" onClick={() => changeMode('forgot')}>
                    Forgot password?
                  </button>
                </div>
              )}

              {mode === 'reset' && !token && (
                <p role="alert" className="text-sm text-destructive">
                  This reset link is invalid or incomplete.{' '}
                  <button type="button" className="underline" onClick={() => changeMode('forgot')}>Request a new link</button>
                </p>
              )}

              {mode === 'verify' && (
                <p className="text-xs text-muted-foreground">
                  Need another verification email? Enter your email above and continue.
                </p>
              )}

              {serverError && <p role="alert" className="text-sm text-destructive">{serverError}</p>}
              <Button type="submit" className="w-full" disabled={busy || (mode === 'reset' && !token)}>
                {busy && <LoaderCircle className="animate-spin" />}
                {busy
                  ? 'Please wait…'
                  : mode === 'login'
                    ? 'Sign in'
                    : mode === 'register'
                      ? 'Create account'
                      : mode === 'forgot'
                        ? 'Send reset link'
                        : mode === 'verify'
                          ? 'Send verification link'
                          : 'Update password'}
              </Button>
            </form>
          )}

          {mode === 'login' && (
            <p className="mt-6 border-t pt-5 text-center text-sm text-muted-foreground">
              New to MedPrep AI?{' '}
              <button type="button" className="font-semibold text-primary underline-offset-4 hover:underline" onClick={() => changeMode('register')}>
                Create an account
              </button>
            </p>
          )}
          {mode === 'register' && (
            <p className="mt-6 border-t pt-5 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <button type="button" className="font-semibold text-primary underline-offset-4 hover:underline" onClick={() => changeMode('login')}>
                Sign in
              </button>
            </p>
          )}
          {(mode === 'forgot' || mode === 'verify' || mode === 'reset') && (
            <p className="mt-6 border-t pt-5 text-center text-sm text-muted-foreground">
              <button type="button" className="font-semibold text-primary underline-offset-4 hover:underline" onClick={() => changeMode('login')}>
                Back to sign in
              </button>
            </p>
          )}
          {mode === 'verified' && !user && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              You may now sign in with your verified email.
            </p>
          )}
          {mode === 'reset-done' && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              <button type="button" className="font-semibold text-primary underline-offset-4 hover:underline" onClick={() => changeMode('login')}>
                Back to sign in
              </button>
            </p>
          )}
          {mode === 'verify-sent' && (
            <button type="button" className="mt-4 w-full text-center text-xs text-primary underline-offset-4 hover:underline" onClick={() => changeMode('verify')}>
              Didn’t get the email? Send another link
            </button>
          )}
          {mode === 'forgot-sent' && (
            <div className="mt-4 space-y-3">
              <button type="button" className="w-full text-center text-xs text-primary underline-offset-4 hover:underline" onClick={() => changeMode('forgot')}>
                Request another reset link
              </button>
              <button type="button" className="w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline" onClick={() => changeMode('login')}>
                Back to sign in
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-[65vh]" aria-label="Loading sign in" />}>
      <AuthPageContent />
    </Suspense>
  );
}
