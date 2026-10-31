import { supabase } from '@/integrations/supabase/client';

export async function postAuthenticated<T>(path: string, payload: unknown): Promise<T> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  const token = data.session?.access_token;
  if (!token) throw new Error('Sign in to continue.');

  const response = await fetch(path, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as { error?: string } & T;

  if (!response.ok) {
    throw new Error(result.error ?? `Request failed (${response.status}).`);
  }
  return result;
}
