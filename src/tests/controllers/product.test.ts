import { Request, Response, NextFunction } from "express";
import { getProductCount, readAllProducts, readProductById } from "../../services/product";
import { mockProduct } from "../mock.data";
import { getAllProducts, getProductById } from "../../controllers/product";
import { InternalException } from "../../errors/exceptions";
import { skip } from "node:test";

jest.mock('../../services/product', () => ({
    readProductById: jest.fn(),
    readAllProducts: jest.fn(),
    getProductCount: jest.fn(),
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
    
    
    describe('get all Products', () => {

        beforeEach(() => {
            req = { 
                query: {
                    skip: '0',
                    take:'5',
                }
            }
        })
        
        it('should get products and return success responce', async () => {
        
            (readAllProducts as jest.Mock).mockResolvedValue([mockProduct]);
            (getProductCount as jest.Mock).mockResolvedValue(1);
        
            await getAllProducts(req as Request, res as Response, next);

            const { skip, take } = req.query!;

            
            expect(readAllProducts).toHaveBeenCalledWith(+skip!, +take!);
            expect(getProductCount).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Get Products successfully', 
                data: [mockProduct],
                count: 1,
                success: true,
            });
        
        });
        
        
        it('should return internal exception if error getting product', async () => {
        
            (readAllProducts as jest.Mock).mockResolvedValue(null);
            (getProductCount as jest.Mock).mockResolvedValue(1);
        
            const error = new Error('Error deleting product');
            const internalException = new InternalException(error);
        
            await getAllProducts(req as Request, res as Response, next);

            const { skip, take } = req.query!;
            
            expect(readAllProducts).toHaveBeenCalledWith(+skip!, +take!);
            expect(getProductCount).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(internalException);
        });
    });
});
