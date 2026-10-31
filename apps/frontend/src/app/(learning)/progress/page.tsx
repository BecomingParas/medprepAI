import type { Metadata } from 'next';
import Performance from '@/features/pages/progress';

export const metadata: Metadata = {
  title: 'Performance',
  description: 'Real practice accuracy, subject comparisons and chapter revision trends.',
};

export default function Page() {
  return <Performance />;
}
