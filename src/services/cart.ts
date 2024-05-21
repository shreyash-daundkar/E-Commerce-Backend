import Prisma, { CartItem, Product } from "./prisma";

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
                quantity: {
                    increment: quantity,
                },
            },
            create: data,
        });
        return cartItem;

    } catch (error) {
        console.log("Error creating cart item", error);
        return null;
    }
}


export const deleteCartItem = async (id: number, userId: number): Promise<CartItem | null> => {
    try {

        const cartItem = await Prisma.cartItem.delete({
            where: {
                id,
                userId,
            },
        });
        return cartItem;

    } catch (error) {
        console.log("Error deleting cart item", error);
        return null;
    }
}

export interface CartItemWithProduct extends CartItem {
    product: Product;
}

export const getCartItemsByUserId = async (id: number): Promise<Array<CartItemWithProduct> | null> => {
    try {

        const cartItems = await Prisma.cartItem.findMany({
            where: {
                userId: id,
            },
            include: {
                product: true,
            }
        });
        return cartItems;

    } catch (error) {
        console.log("Error deleting cart item", error);
        return null;
    }
}