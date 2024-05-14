import { Request, Response, NextFunction } from "express";
import { readProductById } from "../../services/product";
import { mockProduct } from "../mock.data";
import { getProductById } from "../../controllers/product";
import { InternalException } from "../../errors/exceptions";

jest.mock('../../services/product', () => ({
    readProductById: jest.fn(),
}));

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;



describe('Product controller', () => {
    
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });
    
    afterEach(() => jest.clearAllMocks());

    describe('get Product By Id', () => {

        beforeEach(() => {
            req = { 
                params: {
                    id: '1',
                }
            }
        })
        
        it('should get product and return success responce', async () => {
        
            (readProductById as jest.Mock).mockResolvedValue(mockProduct);
        
            await getProductById(req as Request, res as Response, next);
            
            expect(readProductById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Get Product successfully', 
                data: mockProduct,
                success: true,
            });
        
        });
        
        
        it('should return internal exception if error getting product', async () => {
        
            (readProductById as jest.Mock).mockResolvedValue(null);
        
            const error = new Error('Error deleting product');
            const internalException = new InternalException(error);
        
            await getProductById(req as Request, res as Response, next);
            
            expect(readProductById).toHaveBeenCalledWith(1);
            expect(next).toHaveBeenCalledWith(internalException);
        });
    });   
});
