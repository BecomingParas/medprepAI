import type { ReactNode } from 'react';
import { ProtectedWorkspace } from '@/components/ProtectedWorkspace';

export const dynamic = 'force-dynamic';

export default function LearningLayout({ children }: { children: ReactNode }) {
  return <ProtectedWorkspace>{children}</ProtectedWorkspace>;
}
