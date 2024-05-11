import { createProduct } from "../../services/product";
import Prisma from "../../services/prisma";
import { createProductInputMock, mockProduct } from "../mock.data";

jest.mock("../../services/prisma", () => ({
    product: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));




describe('Product Service', () => {


    describe('Create Product', () => {
    
        it('should create and return product', async () => {
    
            (Prisma.product.create as jest.Mock).mockResolvedValue(mockProduct);
    
            const product = await createProduct(createProductInputMock);
            expect(product).toBe(mockProduct);
        });
    
    
        it('should throw error if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.product.create as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            await expect(createProduct(createProductInputMock)).rejects.toThrow(errorMessage);
        });
    
    });
    
});