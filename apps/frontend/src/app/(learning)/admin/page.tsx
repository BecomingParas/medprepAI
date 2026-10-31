import type { Metadata } from 'next';
import Admin from '@/features/pages/admin';

export const metadata: Metadata = {
  title: 'Administration',
  description: 'Manage MedPrep AI Nepal questions, chapters and verified past-paper provenance.',
};

export default function Page() {
  return <Admin />;
}
