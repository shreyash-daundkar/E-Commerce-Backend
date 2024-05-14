import { createProduct, deleteProduct, getProductCount, readProductById, updateProduct } from "../../services/product";
import Prisma from "../../services/prisma";
import { createProductInputMock, mockProduct } from "../mock.data";

jest.mock("../../services/prisma", () => ({
    product: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
    },
}));




describe('Product Service', () => {


    describe('Create Product', () => {
    
        it('should create and return product', async () => {
    
            (Prisma.product.create as jest.Mock).mockResolvedValue(mockProduct);
    
            const product = await createProduct(createProductInputMock);
            expect(product).toBe(mockProduct);
        });
    
    
        it('should return null if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.product.create as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const product = await createProduct(createProductInputMock);

            expect(product).toBeNull();
        });
    
    });


    describe('Update Product', () => {
    
        it('should update and return product', async () => {
    
            (Prisma.product.update as jest.Mock).mockResolvedValue(mockProduct);
    
            const product = await updateProduct(1, createProductInputMock);
            expect(product).toBe(mockProduct);
        });
    
    
        it('should return null if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.product.update as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const product = await updateProduct(1, createProductInputMock);

            expect(product).toBeNull();
        });
    
    });


    describe('Delete Product', () => {
    
        it('should delete and return product', async () => {
    
            (Prisma.product.delete as jest.Mock).mockResolvedValue(mockProduct);
    
            const product = await deleteProduct(1);
            expect(product).toBe(mockProduct);
        });
    
    
        it('should return null if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.product.delete as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const product = await deleteProduct(1);

            expect(product).toBeNull();
        });
    
    });


    describe('read Product by id', () => {
    
        it('should read and return product', async () => {
    
            (Prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);
    
            const product = await readProductById(1);
            expect(product).toBe(mockProduct);
        });
    
    
        it('should return null if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.product.findUnique as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const product = await readProductById(1);

            expect(product).toBeNull();
        });
    
    });


    describe('get product count', () => {
    
        it('should return product counts', async () => {
    
            (Prisma.product.count as jest.Mock).mockResolvedValue(1);
    
            const count = await getProductCount();
            expect(count).toBe(1);
        });
    
    
        it('should return null if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.product.count as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const count = await getProductCount();

            expect(count).toBeNull();
        });
    
    });
    
});