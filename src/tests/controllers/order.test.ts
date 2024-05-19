import { Request, Response, NextFunction } from "express";
import { getCartItemsByUserId } from "../../services/cart";
import { createOrderInputMock, createUserInputMock, mockCartItem, mockCartItemWithProduct, mockOrder } from "../mock.data";
import { createOrder, getOrders } from "../../services/order";
import { getOrdersByUserId, makeOrder } from "../../controllers/order";
import { InternalException, NotFoundException } from "../../errors/exceptions";
import { ErrorCode } from "../../errors/codes";

jest.mock('../../services/cart', () => ({
    getCartItemsByUserId: jest.fn(),
}));

jest.mock('../../services/order', () => ({
    createOrder: jest.fn(),
    getOrders: jest.fn(),
}));

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;



describe('Order controller', () => {
    
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });
    
    afterEach(() => jest.clearAllMocks());



    describe('Create Order', () => {
    
        beforeEach(() => {
            req = { 
                body: {
                    user: {
                        id: 1,
                    },
                },
            }
        });
        
    
        it('should fetch cart, make order and return success responce', async () => {
    
            (getCartItemsByUserId as jest.Mock).mockResolvedValue([mockCartItemWithProduct]);
            (createOrder as jest.Mock).mockResolvedValue(mockOrder);
            
            await makeOrder(req as Request, res as Response, next);
            
            expect(getCartItemsByUserId).toHaveBeenCalledWith(1);
            expect(createOrder).toHaveBeenCalledWith(createOrderInputMock);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Maked order successfully', 
                data: mockOrder,
                success: true,
            });
    
        });

        it('should called next with not found exception if cart is empty', async () => {
    
            (getCartItemsByUserId as jest.Mock).mockResolvedValue([]);
            (createOrder as jest.Mock).mockResolvedValue(mockOrder);
    
            const notFoundException = new NotFoundException(
                'Not found cart items',
                ErrorCode.CART_ITEM_NOT_FOUND,
                null,
            );
    
            await makeOrder(req as Request, res as Response, next);
            
            expect(getCartItemsByUserId).toHaveBeenCalledWith(1);
            expect(createOrder).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(notFoundException);
        });
    
    
        it('should return internal exception if error getting cart', async () => {
    
            (getCartItemsByUserId as jest.Mock).mockResolvedValue(null);
            (createOrder as jest.Mock).mockResolvedValue(mockOrder);
    
            const error = new Error('Error getting cart items');
            const internalException = new InternalException(error);
    
            await makeOrder(req as Request, res as Response, next);
            
            expect(getCartItemsByUserId).toHaveBeenCalledWith(1);
            expect(createOrder).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(internalException);
        });
    });



    describe('Get Orders', () => {
    
        beforeEach(() => {
            req = { 
                body: {
                    user: {
                        id: 1,
                    },
                },
            }
        });
        
    
        it('should fetch order and return success responce', async () => {
    
            (getOrders as jest.Mock).mockResolvedValue([mockOrder]);
            
            await getOrdersByUserId(req as Request, res as Response, next);
            
            expect(getOrders).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Fetched orders successfully', 
                data:[mockOrder],
                success: true,
            });
    
        });

        it('should return internal exception if error getting order', async () => {
    
            (getOrders as jest.Mock).mockResolvedValue(null);

            const error = new Error('Error getting orders');
            const internalException = new InternalException(error);
            
            await getOrdersByUserId(req as Request, res as Response, next);
            
            expect(getOrders).toHaveBeenCalledWith(1);
            expect(next).toHaveBeenCalledWith(internalException);
        });
    });
});