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
        console.log("Error creating product", error);
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
        console.log("Error updating product", error);
        return null;
    }
}


export const deleteProduct = async (id: number): Promise<Product | null> => {
    try {
        const product = await Prisma.product.delete({
            where: { id }
        });
        return product;

    } catch (error) {
        console.log("Error deleting product", error);
        return null;
    }
}


export const readProductById = async (id: number): Promise<Product | null> => {
    try {
        const product = await Prisma.product.findUnique({
            where: { id }
        });
        return product;

    } catch (error) {
        console.log("Error reading product", error);
        return null;
    }
}

export const getProductCount = async (): Promise<number | null> => {
    try {
        const count = await Prisma.product.count();
        return count;

    } catch (error) {
        console.log("Error counting product", error);
        return null;
    }
}


export const readAllProducts = async (skip?: number, take?: number): Promise<Array<Product> | null> => {
    try {
        const products = await Prisma.product.findMany({
            skip: skip || 0,
            take: take|| 5,
        });
        return products;

    } catch (error) {
        console.log("Error reading product", error);
        return null;
    }
}