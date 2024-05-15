import { Request, Response, NextFunction } from "express";
import { createCartItem } from "../../services/cart";
import { addToCartSchema } from "../../schema/cart";
import { mockCartItem } from "../mock.data";
import { addToCart } from "../../controllers/cart";
import { InternalException } from "../../errors/exceptions";

jest.mock('../../services/cart', () => ({
    createCartItem: jest.fn(),
}));

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;



describe('cart controller', () => {
    
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        const signUpSchemaParseMock = jest.spyOn(addToCartSchema, 'parse');
    });
    
    afterEach(() => jest.clearAllMocks());
    
    describe('add to cart', () => {

        beforeEach(() => {
            req = { 
                body: {
                    productId: 1,
                    quantity: 1,
                    user: {
                        id: 1,
                    },
                }
            }
        });


        it('should add to cart and return success responce', async () => {

            (addToCartSchema.parse as jest.Mock).mockResolvedValue(req.body);
            (createCartItem as jest.Mock).mockResolvedValue(mockCartItem);

            await addToCart(req as Request, res as Response, next);
            
            expect(addToCartSchema.parse).toHaveBeenCalledWith(req.body);
            expect(createCartItem).toHaveBeenCalledWith({
                productId: 1,
                quantity: 1,
                userId: 1,
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Add to cart successfully', 
                data: mockCartItem,
                success: true,
            });

        });


        it('should return internal exception if error adding to cart', async () => {

            (addToCartSchema.parse as jest.Mock).mockResolvedValue(req.body);
            (createCartItem as jest.Mock).mockResolvedValue(null);

            const error = new Error('Error creating product');
            const internalException = new InternalException(error);

            await addToCart(req as Request, res as Response, next);
            
            expect(addToCartSchema.parse).toHaveBeenCalledWith(req.body);
            expect(createCartItem).toHaveBeenCalledWith({
                productId: 1,
                quantity: 1,
                userId: 1,
            });
            expect(next).toHaveBeenCalledWith(internalException);
        });
    });
});