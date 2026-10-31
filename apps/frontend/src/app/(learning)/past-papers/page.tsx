import type { Metadata } from 'next';
import PastPapers from '@/features/pages/past-papers';

export const metadata: Metadata = {
  title: 'Past Papers',
  description:
    'Source-attributed MECEE-BL past-paper questions, filtered by year, subject and topic.',
};

export default function Page() {
  return <PastPapers />;
}
