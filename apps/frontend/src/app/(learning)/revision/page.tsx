import type { Metadata } from 'next';
import Revision from '@/features/pages/revision';

export const metadata: Metadata = {
  title: 'Revision centre',
  description: 'Review bookmarked questions, mistakes and weak PCB chapters.',
};

export default function Page() {
  return <Revision />;
}
