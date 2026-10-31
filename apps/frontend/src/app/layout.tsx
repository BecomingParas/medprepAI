import './global.css';

import type { Metadata } from 'next';
import { AppProviders } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'MedPrep AI Nepal — Visual MBBS Entrance Preparation',
    template: '%s — MedPrep AI Nepal',
  },
  description:
    'Build your understanding for Nepal’s MECEE-BL with visual Physics, Chemistry and Biology lessons, sample MCQs, timed mocks and an AI study tutor.',
  openGraph: {
    type: 'website',
    title: 'MedPrep AI Nepal — Understand more. Prepare better.',
    description:
      'A clearer path to MBBS entrance preparation. Explore visual PCB lessons, sample questions and personalized revision.',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
