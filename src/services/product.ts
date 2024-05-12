import Prisma, { Product } from "./prisma";

export interface createProductInput {
    name: string,
    description: string,
    price: number,
    tags: string,
}

export interface updateProductArgs {
    name?: string,
    description?: string,
    price?: number,
    tags?: string,
}

export const createProduct = async (data: createProductInput): Promise<Product | null> => {
    try {
        const product = await Prisma.product.create({ data });
        return product;

    } catch (error) {
        console.log("Error creating user");
        return null;
    }
}


export const updateProduct = async (id: number, data: updateProductArgs): Promise<Product | null> => {
    try {
        const product = await Prisma.product.update({
            where: { id },
            data,
        });
        return product;

    } catch (error) {
        console.log("Error creating user");
        return null;
    }
}