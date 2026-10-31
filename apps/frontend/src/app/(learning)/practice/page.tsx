import type { Metadata } from 'next';
import Practice from '@/features/pages/practice';

export const metadata: Metadata = {
  title: 'Question practice',
  description:
    'Search PCB sample questions by subject, chapter and difficulty, and save revision questions.',
};

export default function Page() {
  return <Practice />;
}
