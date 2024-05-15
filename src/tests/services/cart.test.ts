import { createCartItem } from "../../services/cart";
import Prisma from "../../services/prisma";
import { createCartItemInputMock, mockCartItem } from "../mock.data";

jest.mock("../../services/prisma", () => ({
    cartItem: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
    },
}));




describe('Cart Service', () => {


    describe('Create Cart Item', () => {
    
        it('should create and return carItem', async () => {
    
            (Prisma.cartItem.upsert as jest.Mock).mockResolvedValue(mockCartItem);
    
            const cartItem = await createCartItem(createCartItemInputMock);

            expect(cartItem).toBe(mockCartItem);
        });
    
    
        it('should return null if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.cartItem.upsert as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const cartItem = await createCartItem(createCartItemInputMock);

            expect(cartItem).toBeNull();
        });
     
    });
});