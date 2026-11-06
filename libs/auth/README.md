# Authentication library

`@sass-project/auth` owns the Better Auth server configuration and server-side
session/permission checks. Import server APIs from the package root and the
browser-only client from `@sass-project/auth/client`.

The server reads `BETTER_AUTH_SECRET` (at least 32 characters),
`BETTER_AUTH_URL`, and `FRONTEND_ORIGINS`. `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` are an optional pair. Verification and password-reset
email delivery require `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`.

New accounts always receive the `student` role. Role input is disabled in
Better Auth and server authorization reads the role from the persisted user
record. Bootstrap a verified account as the first superadmin by setting
`BOOTSTRAP_SUPERADMIN_EMAIL` and running `yarn db:seed`.

The Better Auth rate limiter is enabled with stricter sign-in, sign-up, and
recovery limits. Its default storage is process-local; multi-instance
deployments should connect Better Auth secondary storage before switching the
rate limiter to that backend.
