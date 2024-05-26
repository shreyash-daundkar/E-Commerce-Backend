"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../services/product");
const product_2 = require("../../schema/product");
const mock_data_1 = require("../mock.data");
const admin_1 = require("../../controllers/admin");
const exceptions_1 = require("../../errors/exceptions");
const order_1 = require("../../services/order");
jest.mock('../../services/product', () => ({
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
}));
jest.mock('../../services/order', () => ({
    getOrders: jest.fn(),
    updateOrder: jest.fn(),
}));
let req;
let res;
let next;
describe('Admin controller', () => {
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        const signUpSchemaParseMock = jest.spyOn(product_2.createProductSchema, 'parse');
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
            };
        });
        it('should add product and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            product_2.createProductSchema.parse.mockResolvedValue(req.body);
            product_1.createProduct.mockResolvedValue(mock_data_1.mockProduct);
            yield (0, admin_1.addProduct)(req, res, next);
            expect(product_2.createProductSchema.parse).toHaveBeenCalledWith(req.body);
            expect(product_1.createProduct).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Product created successfully',
                data: mock_data_1.mockProduct,
                success: true,
            });
        }));
        it('should return internal exception if error creating product', () => __awaiter(void 0, void 0, void 0, function* () {
            product_2.createProductSchema.parse.mockResolvedValue(req.body);
            product_1.createProduct.mockResolvedValue(null);
            const error = new Error('Error creating product');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, admin_1.addProduct)(req, res, next);
            expect(product_2.createProductSchema.parse).toHaveBeenCalledWith(req.body);
            expect(product_1.createProduct).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith(internalException);
        }));
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
            };
        });
        it('should edit product and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            product_1.updateProduct.mockResolvedValue(mock_data_1.mockProduct);
            yield (0, admin_1.editProduct)(req, res, next);
            expect(product_1.updateProduct).toHaveBeenCalledWith(1, req.body.updatedData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Product edited successfully',
                data: mock_data_1.mockProduct,
                success: true,
            });
        }));
        it('should return internal exception if error updating product', () => __awaiter(void 0, void 0, void 0, function* () {
            product_1.updateProduct.mockResolvedValue(null);
            const error = new Error('Error updating product');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, admin_1.editProduct)(req, res, next);
            expect(product_1.updateProduct).toHaveBeenCalledWith(1, req.body.updatedData);
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('remove product', () => {
        beforeEach(() => {
            req = {
                params: {
                    id: '1',
                }
            };
        });
        it('should remove product and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            product_1.deleteProduct.mockResolvedValue(mock_data_1.mockProduct);
            yield (0, admin_1.removeProduct)(req, res, next);
            expect(product_1.deleteProduct).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Product removed successfully',
                data: mock_data_1.mockProduct,
                success: true,
            });
        }));
        it('should return internal exception if error removing product', () => __awaiter(void 0, void 0, void 0, function* () {
            product_1.deleteProduct.mockResolvedValue(null);
            const error = new Error('Error deleting product');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, admin_1.removeProduct)(req, res, next);
            expect(product_1.deleteProduct).toHaveBeenCalledWith(1);
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('Get Orders', () => {
        it('should fetch order and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            order_1.getOrders.mockResolvedValue([mock_data_1.mockOrder]);
            yield (0, admin_1.getAllActiveOrders)(req, res, next);
            expect(order_1.getOrders).toHaveBeenCalledWith();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Fetched orders successfully',
                data: [mock_data_1.mockOrder],
                success: true,
            });
        }));
        it('should return internal exception if error getting order', () => __awaiter(void 0, void 0, void 0, function* () {
            order_1.getOrders.mockResolvedValue(null);
            const error = new Error('Error getting orders');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, admin_1.getAllActiveOrders)(req, res, next);
            expect(order_1.getOrders).toHaveBeenCalledWith();
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('Complete Orders', () => {
        beforeEach(() => {
            req = {
                params: {
                    id: "1",
                },
            };
        });
        it('should complete order and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            order_1.updateOrder.mockResolvedValue(mock_data_1.mockOrder);
            yield (0, admin_1.completeOrder)(req, res, next);
            expect(order_1.updateOrder).toHaveBeenCalledWith(Object.assign(Object.assign({}, mock_data_1.updateOrderInputMock), { isComplete: true }));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Order completing successfully",
                data: mock_data_1.mockOrder,
                success: true,
            });
        }));
        it('should return internal exception if error completing order', () => __awaiter(void 0, void 0, void 0, function* () {
            order_1.updateOrder.mockResolvedValue(null);
            const error = new Error('Error updating order');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, admin_1.completeOrder)(req, res, next);
            expect(order_1.updateOrder).toHaveBeenCalledWith(Object.assign(Object.assign({}, mock_data_1.updateOrderInputMock), { isComplete: true }));
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
});
