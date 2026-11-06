import { prisma } from '../src/lib/prisma.js';

async function seedSuperadmin(): Promise<void> {
  const email = process.env.BOOTSTRAP_SUPERADMIN_EMAIL?.trim().toLowerCase();
  if (!email) {
    throw new Error(
      'Set BOOTSTRAP_SUPERADMIN_EMAIL to an existing verified account before running the bootstrap seed.',
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(`No account exists for BOOTSTRAP_SUPERADMIN_EMAIL (${email}). Create and verify it first.`);
  }
  if (!user.emailVerified) {
    throw new Error('The bootstrap superadmin account must have a verified email address.');
  }

  if (user.role !== 'superadmin') {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'superadmin' },
    });
  }
}

seedSuperadmin()
  .catch((error: unknown) => {
    console.error('Database bootstrap seed failed.', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
