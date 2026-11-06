import axios from 'axios';
import {
  hasPermission,
  PERMISSIONS,
  signUpSchema,
  USER_ROLES,
  userRoleSchema,
} from '@sass-project/shared';

describe('shared authentication and authorization contracts', () => {
  it('only accepts the supported server-assigned roles', () => {
    expect(USER_ROLES).toEqual(['superadmin', 'admin', 'student']);
    expect(userRoleSchema.safeParse('student').success).toBe(true);
    expect(userRoleSchema.safeParse('user').success).toBe(false);
  });

  it('keeps content and user administration permissions on trusted roles', () => {
    expect(hasPermission('student', PERMISSIONS.manageContent)).toBe(false);
    expect(hasPermission('admin', PERMISSIONS.manageContent)).toBe(true);
    expect(hasPermission('superadmin', PERMISSIONS.manageUsers)).toBe(true);
    expect(hasPermission('unknown', PERMISSIONS.manageContent)).toBe(false);
  });

  it('rejects role assignment in public sign-up data', () => {
    expect(
      signUpSchema.safeParse({
        name: 'Student Example',
        email: 'student@example.com',
        password: 'secure-password',
        role: 'superadmin',
      }).success,
    ).toBe(false);
  });

  it('rejects protected GraphQL mutations without a valid Better Auth session', async () => {
    const response = await axios.post('/graphql', {
      query: 'mutation { saveAttempt(questionId: "not-a-question", selectedIndex: 0) }',
    });

    expect(response.data.errors?.[0]?.extensions?.code).toBe('UNAUTHENTICATED');
  });
});
