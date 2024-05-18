import Prisma, { CartItem, Order } from "./prisma";


export interface createOrderInput {
    userId: number,
    amount: number,
    products: {
        productId: number,
        quantity: number,
    }[],
}

export const createOrder = async (data: createOrderInput): Promise<Order | null> => {
    try {
        const { userId, amount, products } = data;

        const order = await Prisma.$transaction(async prisma => {

            const order = await prisma.order.create({
                data: {
                    userId,
                    amount,
                    products: {
                        create: products
                    },
                }
            });

            const deletedCartItems = await prisma.cartItem.deleteMany({
                where: {
                    userId,
                }
            });

            return order
        });

        return order;

    } catch (error) {
        console.log("Error creating order", error);
        return null;
    }
}