import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();

export type { User, Product, CartItem, Order } from '@prisma/client';

export default Prisma;