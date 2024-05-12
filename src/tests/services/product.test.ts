import { createProduct, updateProduct } from "../../services/product";
import Prisma from "../../services/prisma";
import { createProductInputMock, mockProduct } from "../mock.data";

jest.mock("../../services/prisma", () => ({
    product: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
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
    
});