import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { Database } from '@/integrations/supabase/types';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function requiredEnv(name: string, value: string | undefined): string {
  if (!value) throw new ApiError(`Server configuration is missing ${name}.`, 500);
  return value;
}

export async function parseJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError('Request body must be valid JSON.', 400);
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function requireAuthenticatedUser(request: Request) {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    throw new ApiError('Sign in to continue.', 401);
  }
  const token = authorization.slice('Bearer '.length);
  if (!token) throw new ApiError('Sign in to continue.', 401);

  const url = requiredEnv(
    'SUPABASE_URL',
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
  const key = requiredEnv(
    'SUPABASE_PUBLISHABLE_KEY',
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
  const supabase = createClient<Database>(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) throw new ApiError('Your session is invalid or expired.', 401);
  return { supabase, user: data.user };
}

export async function requireAdmin(
  supabase: Awaited<ReturnType<typeof requireAuthenticatedUser>>['supabase'],
): Promise<void> {
  const { data, error } = await supabase.from('user_roles').select('role');
  if (error) throw new ApiError('Could not verify admin access.', 500);
  if (!data.some((role) => role.role === 'admin')) {
    throw new ApiError('Admin access required.', 403);
  }
}

export function createAdminClient() {
  const url = requiredEnv(
    'SUPABASE_URL',
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
  const key = requiredEnv('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY);
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function apiErrorResponse(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    if (error.status >= 500) console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error(error);
  return NextResponse.json({ error: 'The request could not be completed.' }, { status: 500 });
}
