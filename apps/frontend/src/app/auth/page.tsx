import type { Metadata } from 'next';
import AuthPage from '@/features/pages/auth';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to save your MBBS entrance practice progress.',
  openGraph: {
    title: 'Sign in — MedPrep AI Nepal',
    description: 'Sign in to save your MBBS entrance practice progress.',
  },
  twitter: { card: 'summary' },
};

export default function Page() {
  return <AuthPage />;
}
