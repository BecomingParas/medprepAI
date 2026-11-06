import {
  hasPermission,
  isUserRole,
  type AuthUser,
  type Permission,
  type UserRole,
} from '@sass-project/shared';
import { getSession } from '../session/session.ts';

export class AuthorizationError extends Error {
  constructor(
    message: string,
    readonly status: 401 | 403,
  ) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export type AuthenticatedUser = AuthUser;

export async function getAuthenticatedUser(headers: Headers): Promise<AuthenticatedUser> {
  const session = await getSession(headers);
  if (!session) {
    throw new AuthorizationError('Sign in to continue.', 401);
  }

  const role = session.user.role;
  if (!isUserRole(role)) {
    throw new AuthorizationError('This account does not have a valid role.', 403);
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    emailVerified: session.user.emailVerified,
    image: session.user.image ?? null,
    role,
  };
}

export function assertRole(user: Pick<AuthenticatedUser, 'role'>, roles: readonly UserRole[]): void {
  if (!roles.includes(user.role)) {
    throw new AuthorizationError('You do not have permission to perform this action.', 403);
  }
}

export function assertPermission(
  user: Pick<AuthenticatedUser, 'role'>,
  permission: Permission,
): void {
  if (!hasPermission(user.role, permission)) {
    throw new AuthorizationError('You do not have permission to perform this action.', 403);
  }
}

export async function requireRole(
  headers: Headers,
  roles: readonly UserRole[],
): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser(headers);
  assertRole(user, roles);
  return user;
}

export async function requirePermission(
  headers: Headers,
  permission: Permission,
): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser(headers);
  assertPermission(user, permission);
  return user;
}
