UPDATE "User"
SET "role" = 'student'
WHERE "role" = 'user';

ALTER TABLE "User"
ALTER COLUMN "role" SET DEFAULT 'student';

ALTER TABLE "User"
ADD CONSTRAINT "User_role_check"
CHECK ("role" IN ('superadmin', 'admin', 'student'));
