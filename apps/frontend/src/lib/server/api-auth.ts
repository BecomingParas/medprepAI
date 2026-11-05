import 'server-only';

import { getAuth } from '@sass-project/auth';
import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
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

type AuthenticatedUser = { id: string; role?: string | null };

export async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const session = await getAuth().api.getSession({ headers: request.headers });
  if (!session) throw new ApiError('Sign in to continue.', 401);
  return session.user;
}

export function requireAdmin(user: AuthenticatedUser): void {
  if (user.role !== 'admin') {
    throw new ApiError('Admin access required.', 403);
  }
}

export function apiErrorResponse(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    if (error.status >= 500) console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error(error);
  return NextResponse.json({ error: 'The request could not be completed.' }, { status: 500 });
}
