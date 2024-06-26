import { createCartItem, deleteCartItem, getCartItemsByUserId } from "../../services/cart";
import Prisma from "../../services/prisma";
import { createCartItemInputMock, mockCartItem } from "../mock.data";

jest.mock("../../services/prisma", () => ({
    cartItem: {
        findMany: jest.fn(),
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


    describe('Delete Cart Item', () => {
    
        it('should delete and return carItem', async () => {
    
            (Prisma.cartItem.delete as jest.Mock).mockResolvedValue(mockCartItem);
    
            const cartItem = await deleteCartItem(1, 1);
    
            expect(cartItem).toBe(mockCartItem);
        });
    
    
        it('should return null if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.cartItem.delete as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const cartItem = await deleteCartItem(1, 1);
    
            expect(cartItem).toBeNull();
        });
    });


    describe('Get Cart Items by user id', () => {
    
        it('should get cart items by user id and return carItems', async () => {
    
            (Prisma.cartItem.findMany as jest.Mock).mockResolvedValue([mockCartItem]);
    
            const cartItems = await getCartItemsByUserId(1);
    
            expect(cartItems).toStrictEqual([mockCartItem]);
        });
    
    
        it('should return null if it failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.cartItem.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            const cartItems = await getCartItemsByUserId(1);
    
            expect(cartItems).toBeNull();
        });
    });
});