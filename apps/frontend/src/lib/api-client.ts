export async function postAuthenticated<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: {
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
