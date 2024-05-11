import { Request, Response, NextFunction } from "express";
import { createProduct } from "../../services/product";
import { createProductSchema } from "../../schema/product";
import { mockProduct } from "../mock.data";
import { addProduct } from "../../controllers/product";

jest.mock('../../services/product', () => ({
    createProduct: jest.fn(),
}));

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;



describe('Product controller', () => {
    
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        const signUpSchemaParseMock = jest.spyOn(createProductSchema, 'parse');
    });
    
    afterEach(() => jest.clearAllMocks());
    
    describe('add product', () => {

        req = { 
            body: {
                name: 'test',
                description: 'test',
                price: 20,
                tags: 'string',
            }
        }

        it('should add product and return success responce', async () => {

            (createProductSchema.parse as jest.Mock).mockResolvedValue(req.body);
            (createProduct as jest.Mock).mockResolvedValue(mockProduct);

            await addProduct(req as Request, res as Response, next);
            
            expect(createProductSchema.parse).toHaveBeenCalledWith(req.body);
            expect(createProduct).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Product created successfully', 
                data: mockProduct,
                success: true,
            });

        })
    })

})