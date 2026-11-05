import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses | MedPrep AI Nepal',
  description:
    'Explore Physics, Chemistry, Biology and common entrance examination preparation resources for Nepal MECEE-BL.',
};

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
