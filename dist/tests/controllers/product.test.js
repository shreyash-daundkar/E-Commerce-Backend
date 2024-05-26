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
const mock_data_1 = require("../mock.data");
const product_2 = require("../../controllers/product");
const exceptions_1 = require("../../errors/exceptions");
jest.mock('../../services/product', () => ({
    readProductById: jest.fn(),
    readAllProducts: jest.fn(),
    getProductCount: jest.fn(),
}));
let req;
let res;
let next;
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
            };
        });
        it('should get product and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            product_1.readProductById.mockResolvedValue(mock_data_1.mockProduct);
            yield (0, product_2.getProductById)(req, res, next);
            expect(product_1.readProductById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Get Product successfully',
                data: mock_data_1.mockProduct,
                success: true,
            });
        }));
        it('should return internal exception if error getting product', () => __awaiter(void 0, void 0, void 0, function* () {
            product_1.readProductById.mockResolvedValue(null);
            const error = new Error('Error deleting product');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, product_2.getProductById)(req, res, next);
            expect(product_1.readProductById).toHaveBeenCalledWith(1);
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('get all Products', () => {
        beforeEach(() => {
            req = {
                query: {
                    skip: '0',
                    take: '5',
                }
            };
        });
        it('should get products and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            product_1.readAllProducts.mockResolvedValue([mock_data_1.mockProduct]);
            product_1.getProductCount.mockResolvedValue(1);
            yield (0, product_2.getAllProducts)(req, res, next);
            const { skip, take } = req.query;
            expect(product_1.readAllProducts).toHaveBeenCalledWith(+skip, +take);
            expect(product_1.getProductCount).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Get Products successfully',
                data: [mock_data_1.mockProduct],
                count: 1,
                success: true,
            });
        }));
        it('should return internal exception if error getting product', () => __awaiter(void 0, void 0, void 0, function* () {
            product_1.readAllProducts.mockResolvedValue(null);
            product_1.getProductCount.mockResolvedValue(1);
            const error = new Error('Error deleting product');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, product_2.getAllProducts)(req, res, next);
            const { skip, take } = req.query;
            expect(product_1.readAllProducts).toHaveBeenCalledWith(+skip, +take);
            expect(product_1.getProductCount).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
});
