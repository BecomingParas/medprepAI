import type { Metadata } from 'next';
import Lessons from '@/features/pages/lessons';

export const metadata: Metadata = {
  title: 'Visual lessons',
  description: 'Explore PCB topics through labelled science visuals and practice.',
};

export default function Page() {
  return <Lessons />;
}
