import Prisma, { Product } from "./prisma";

export interface createProductInput {
    name: string,
    description: string,
    price: number,
    tags: string,
}

export const createProduct = async (data: createProductInput): Promise<Product> => {
    try {
        const product = await Prisma.product.create({ data });
        return product;

    } catch (error) {
        console.log("Error creating user");
        throw error;
    }
}