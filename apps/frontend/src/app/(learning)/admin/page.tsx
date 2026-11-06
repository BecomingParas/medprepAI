import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthorizationError, requirePermission } from '@sass-project/auth';
import { PERMISSIONS } from '@sass-project/shared';
import Admin from '@/features/pages/admin';

export const metadata: Metadata = {
  title: 'Administration',
  description: 'Manage MedPrep AI Nepal questions, chapters and verified past-paper provenance.',
};

export default async function Page() {
  try {
    await requirePermission(await headers(), PERMISSIONS.manageContent);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      redirect(error.status === 401 ? '/login?next=%2Fadmin' : '/dashboard');
    }
    throw error;
  }

  return <Admin />;
}
