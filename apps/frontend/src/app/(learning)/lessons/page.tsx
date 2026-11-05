import type { Metadata } from 'next';
import Lessons from '@/features/pages/lessons';

export const metadata: Metadata = {
  title: 'Learning workspace',
  description: 'Study entrance-exam topics with reviewed notes, science visuals and practice.',
};

export default function Page() {
  return <Lessons />;
}
