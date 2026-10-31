import type { Metadata } from 'next';
import Tutor from '@/features/pages/tutor';

export const metadata: Metadata = {
  title: 'AI Study Tutor',
  description: 'Ask an AI tutor any Physics, Chemistry or Biology doubt for the MBBS entrance.',
};

export default function Page() {
  return <Tutor />;
}
