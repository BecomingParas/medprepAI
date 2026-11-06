export type AuthEnvironment = {
  secret: string;
  baseURL: string;
  trustedOrigins: string[];
  googleClientId?: string;
  googleClientSecret?: string;
  production: boolean;
};

function parseOrigin(value: string, variableName: string, production: boolean): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${variableName} must contain a valid URL origin.`);
  }

  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(`${variableName} must be an origin without credentials, path, query or fragment.`);
  }

  if (production && url.protocol !== 'https:') {
    throw new Error(`${variableName} must use HTTPS in production.`);
  }

  return url.origin;
}

export function readAuthEnvironment(
  env: NodeJS.ProcessEnv = process.env,
): AuthEnvironment {
  const production = env.NODE_ENV === 'production';
  const secret = env.BETTER_AUTH_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error('BETTER_AUTH_SECRET must be set to at least 32 characters.');
  }

  const configuredBaseURL = env.BETTER_AUTH_URL?.trim();
  const baseURL = configuredBaseURL || (production ? '' : 'http://localhost:3000');
  if (!baseURL) {
    throw new Error('BETTER_AUTH_URL must be set in production.');
  }

  const baseOrigin = parseOrigin(baseURL, 'BETTER_AUTH_URL', production);
  const frontendOrigins = (env.FRONTEND_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => parseOrigin(origin, 'FRONTEND_ORIGINS', production));

  const googleClientId = env.GOOGLE_CLIENT_ID?.trim();
  const googleClientSecret = env.GOOGLE_CLIENT_SECRET?.trim();
  if (Boolean(googleClientId) !== Boolean(googleClientSecret)) {
    throw new Error('Set both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google sign-in.');
  }

  return {
    secret,
    baseURL: baseOrigin,
    trustedOrigins: [...new Set([baseOrigin, ...frontendOrigins])],
    ...(googleClientId && googleClientSecret ? { googleClientId, googleClientSecret } : {}),
    production,
  };
}
