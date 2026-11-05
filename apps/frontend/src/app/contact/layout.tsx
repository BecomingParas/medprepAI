import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | MedPrep AI Nepal',
  description:
    'Have a question or suggestion? Get in touch with the MedPrep AI Nepal team.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
