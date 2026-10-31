import type { Metadata } from 'next';
import Dashboard from '@/features/pages/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Your MBBS entrance study overview: attempts, accuracy, streak and what to revise next.',
  openGraph: {
    title: 'Student Dashboard — MedPrep AI Nepal',
    description: 'Track your PCB practice and see what to revise next.',
  },
  twitter: { card: 'summary' },
};

export default function Page() {
  return <Dashboard />;
}
