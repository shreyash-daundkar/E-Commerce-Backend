import Prisma, { CartItem } from "./prisma";

export interface createCartItemsInput {
    userId: number,
    productId: number,
    quantity: number,
}


export const createCartItem = async (data: createCartItemsInput): Promise<CartItem | null> => {
    try {
        let { productId, userId, quantity } = data;

        const cartItem = await Prisma.cartItem.upsert({
            where: {
                userId_productId: {
                    userId,
                    productId
                },
            },
            update: {
                quantity: quantity + 1,
            },
            create: data,
        });
        return cartItem;

    } catch (error) {
        console.log("Error creating product", error);
        return null;
    }
}