import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();

export type { User } from '@prisma/client';

export default Prisma;