import { getAuth } from '@sass-project/auth';
import { toNextJsHandler } from 'better-auth/next-js';

type AuthHandlers = ReturnType<typeof toNextJsHandler>;
let authHandlers: AuthHandlers | undefined;

function getAuthHandlers(): AuthHandlers {
  authHandlers ??= toNextJsHandler(getAuth());
  return authHandlers;
}

export async function GET(request: Request): Promise<Response> {
  return getAuthHandlers().GET(request);
}

export async function POST(request: Request): Promise<Response> {
  return getAuthHandlers().POST(request);
}
