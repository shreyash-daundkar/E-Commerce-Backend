import { z } from 'zod';

export const addToCartSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
});