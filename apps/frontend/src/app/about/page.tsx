import type { Metadata } from 'next';
import AboutPage from '@/features/about/about-page';

export const metadata: Metadata = {
  title: 'About | MedPrep AI Nepal',
  description:
    'Discover MedPrep AI Nepal, a visual learning platform for MBBS and MECEE-BL preparation.',
};

export default function Page() {
  return <AboutPage />;
}
