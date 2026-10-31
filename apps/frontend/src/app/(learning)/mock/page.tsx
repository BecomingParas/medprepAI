import type { Metadata } from 'next';
import MockPage from '@/features/pages/mock';

export const metadata: Metadata = {
  title: 'Timed Mock Exam',
  description: 'Take a timed MECEE-style PCB mock exam and see your score instantly.',
};

export default function Page() {
  return <MockPage />;
}
