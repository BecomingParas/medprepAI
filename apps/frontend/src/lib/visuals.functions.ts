import { postAuthenticated } from '@/lib/api-client';

export const generateVisual = ({ data }: { data: { questionId: string } }) =>
  postAuthenticated<{ imageUrl: string }>('/api/visual', data);
