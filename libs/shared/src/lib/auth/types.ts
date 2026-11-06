import type { UserRole } from './roles.ts';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
};

export type AuthSession = {
  id: string;
  expiresAt: Date;
  user: AuthUser;
};
