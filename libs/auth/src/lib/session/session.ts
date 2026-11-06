import { getAuth } from '../server/auth.ts';

export async function getSession(headers: Headers) {
  return getAuth().api.getSession({ headers });
}
