export const USER_ROLES = ['superadmin', 'admin', 'student'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const SUPERADMIN_ROLE = 'superadmin' as const;
export const ADMIN_ROLE = 'admin' as const;
export const STUDENT_ROLE = 'student' as const;

export const PERMISSIONS = {
  readLearning: 'learning:read',
  saveAttempt: 'learning:attempt',
  manageBookmarks: 'learning:bookmark',
  manageContent: 'content:manage',
  manageUsers: 'users:manage',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  superadmin: Object.values(PERMISSIONS),
  admin: [
    PERMISSIONS.readLearning,
    PERMISSIONS.saveAttempt,
    PERMISSIONS.manageBookmarks,
    PERMISSIONS.manageContent,
  ],
  student: [
    PERMISSIONS.readLearning,
    PERMISSIONS.saveAttempt,
    PERMISSIONS.manageBookmarks,
  ],
};

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLES.some((role) => role === value);
}

export function hasRole(value: unknown, roles: readonly UserRole[]): boolean {
  return isUserRole(value) && roles.includes(value);
}

export function hasPermission(role: unknown, permission: Permission): boolean {
  return isUserRole(role) && ROLE_PERMISSIONS[role].includes(permission);
}
