import { Request, Response, NextFunction } from "express";
import { createProduct, updateProduct } from "../../services/product";
import { createProductSchema } from "../../schema/product";
import { mockProduct } from "../mock.data";
import { addProduct, editProduct } from "../../controllers/admin";
import { InternalException } from "../../errors/exceptions";

jest.mock('../../services/product', () => ({
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
}));

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;



describe('Admin controller', () => {
    
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        const signUpSchemaParseMock = jest.spyOn(createProductSchema, 'parse');
    });
    
    afterEach(() => jest.clearAllMocks());
    
    describe('add product', () => {

        beforeEach(() => {
            req = { 
                body: {
                    name: 'test',
                    description: 'test',
                    price: 20,
                    tags: 'string',
                }
            }
        });


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

        });


        it('should return internal exception if error creating product', async () => {

            (createProductSchema.parse as jest.Mock).mockResolvedValue(req.body);
            (createProduct as jest.Mock).mockResolvedValue(null);

            const error = new Error('Error creating product');
            const internalException = new InternalException(error);

            await addProduct(req as Request, res as Response, next);
            
            expect(createProductSchema.parse).toHaveBeenCalledWith(req.body);
            expect(createProduct).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith(internalException);
        });
    });

    describe('edit product', () => {
        beforeEach(() => {
            req = { 
                body: {
                    updatedData: {
                        name: 'test',
                        description: 'test',
                        price: 20,
                        tags: 'string',
                    },
                },
                params: {
                    id: '1',
                }
            }
        })

        it('should edit product and return success responce', async () => {

            (updateProduct as jest.Mock).mockResolvedValue(mockProduct);

            await editProduct(req as Request, res as Response, next);
            
            expect(updateProduct).toHaveBeenCalledWith(1, req.body.updatedData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Product edited successfully', 
                data: mockProduct,
                success: true,
            });

        });


        it('should return internal exception if error updating product', async () => {

            (updateProduct as jest.Mock).mockResolvedValue(null);

            const error = new Error('Error updating product');
            const internalException = new InternalException(error);

            await editProduct(req as Request, res as Response, next);
            
            expect(updateProduct).toHaveBeenCalledWith(1, req.body.updatedData);
            expect(next).toHaveBeenCalledWith(internalException);
        });
    });
});