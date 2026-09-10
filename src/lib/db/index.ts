import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Invalidate cached prisma instance if newly added models are not present on it
if (globalForPrisma.prisma && (!('user' in (globalForPrisma.prisma as any)) || !('otpVerification' in (globalForPrisma.prisma as any)))) {
  globalForPrisma.prisma = undefined;
}

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
