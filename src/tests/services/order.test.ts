import { createOrder } from "../../services/order";
import Prisma from "../../services/prisma";
import { createOrderInputMock, mockCartItem, mockOrder } from "../mock.data";

jest.mock("../../services/prisma", () => ({
    $transaction: jest.fn(),
    order: {
        create: jest.fn(),   
    },
    cartItem: {
        deleteMany: jest.fn(),
    },
}));


describe('Order Service', () => {


    describe('Create Order', () => {
    
        it('should create and return order', async () => {
    
            (Prisma.order.create as jest.Mock).mockResolvedValue(mockOrder);
            (Prisma.cartItem.deleteMany as jest.Mock).mockResolvedValue([mockCartItem]);
            (Prisma.$transaction as jest.Mock).mockResolvedValue(mockOrder);
    
            const order = await createOrder(createOrderInputMock);

            expect(order).toBe(mockOrder);
        });
    
    
        it('should return null if create order failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.order.create as jest.Mock).mockRejectedValue(new Error(errorMessage));
            (Prisma.cartItem.deleteMany as jest.Mock).mockResolvedValue([mockCartItem]);
            (Prisma.$transaction as jest.Mock).mockResolvedValue(null);
    
            const order = await createOrder(createOrderInputMock);

            expect(Prisma.cartItem.deleteMany).not.toHaveBeenCalled();
            expect(order).toBeNull();
        });

        it('should return null if delete cart items failed', async () => {
    
            const errorMessage = 'Database error';
    
            (Prisma.order.create as jest.Mock).mockResolvedValue(mockOrder);
            (Prisma.cartItem.deleteMany as jest.Mock).mockRejectedValue(new Error(errorMessage));
            (Prisma.$transaction as jest.Mock).mockResolvedValue(null);
    
            const order = await createOrder(createOrderInputMock);

            expect(order).toBeNull();
        });
    });
});