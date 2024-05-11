import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();

export type { User, Product } from '@prisma/client';

export default Prisma;