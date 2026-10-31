# Legacy Vite route sources

The routes in this folder are retained as a migration reference only. The active
frontend uses the Next.js App Router under `../../src/app`; do not add routes here.

| URL | Next.js route |
| --- | --- |
| `/` | `../../src/app/page.tsx` |
| `/auth` | `../../src/app/auth/page.tsx` |
| `/dashboard` | `../../src/app/(learning)/dashboard/page.tsx` |
| `/lessons` | `../../src/app/(learning)/lessons/page.tsx` |
| `/practice` | `../../src/app/(learning)/practice/page.tsx` |
| `/revision` | `../../src/app/(learning)/revision/page.tsx` |
| `/mock` | `../../src/app/(learning)/mock/page.tsx` |
| `/past-papers` | `../../src/app/(learning)/past-papers/page.tsx` |
| `/tutor` | `../../src/app/(learning)/tutor/page.tsx` |
| `/progress` | `../../src/app/(learning)/progress/page.tsx` |
| `/admin` | `../../src/app/(learning)/admin/page.tsx` |

Interactive page implementations and shared UI now live in `../../src/features`,
`../../src/components`, and `../../src/lib`.
