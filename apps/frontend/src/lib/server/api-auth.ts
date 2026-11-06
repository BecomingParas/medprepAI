import 'server-only';

import { AuthorizationError, getAuthenticatedUser } from '@sass-project/auth';
import {
  apiError,
  hasPermission,
  PERMISSIONS,
  type ApiErrorCode,
  type AuthUser,
} from '@sass-project/shared';
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

export async function requireAuthenticatedUser(request: Request): Promise<AuthUser> {
  try {
    return await getAuthenticatedUser(request.headers);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      throw new ApiError(error.message, error.status);
    }
    throw error;
  }
}

export function requireAdmin(user: AuthUser): void {
  if (!hasPermission(user.role, PERMISSIONS.manageContent)) {
    throw new ApiError('Admin access required.', 403);
  }
}

export function apiErrorResponse(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    if (error.status >= 500) console.error(error);
    let code: ApiErrorCode | undefined;
    switch (error.status) {
      case 401:
        code = 'UNAUTHENTICATED';
        break;
      case 403:
        code = 'FORBIDDEN';
        break;
      case 400:
        code = 'BAD_REQUEST';
        break;
      case 404:
        code = 'NOT_FOUND';
        break;
      case 429:
        code = 'RATE_LIMITED';
        break;
      default:
        if (error.status >= 500) code = 'INTERNAL_ERROR';
    }
    return NextResponse.json(apiError(error.message, code), { status: error.status });
  }
  console.error(error);
  return NextResponse.json(
    apiError('The request could not be completed.', 'INTERNAL_ERROR'),
    { status: 500 },
  );
}
