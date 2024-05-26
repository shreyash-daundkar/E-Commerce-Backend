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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../services/product");
const prisma_1 = __importDefault(require("../../services/prisma"));
const mock_data_1 = require("../mock.data");
jest.mock("../../services/prisma", () => ({
    product: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
        findMany: jest.fn(),
    },
}));
describe('Product Service', () => {
    describe('Create Product', () => {
        it('should create and return product', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.product.create.mockResolvedValue(mock_data_1.mockProduct);
            const product = yield (0, product_1.createProduct)(mock_data_1.createProductInputMock);
            expect(product).toBe(mock_data_1.mockProduct);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.product.create.mockRejectedValue(new Error(errorMessage));
            const product = yield (0, product_1.createProduct)(mock_data_1.createProductInputMock);
            expect(product).toBeNull();
        }));
    });
    describe('Update Product', () => {
        it('should update and return product', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.product.update.mockResolvedValue(mock_data_1.mockProduct);
            const product = yield (0, product_1.updateProduct)(1, mock_data_1.createProductInputMock);
            expect(product).toBe(mock_data_1.mockProduct);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.product.update.mockRejectedValue(new Error(errorMessage));
            const product = yield (0, product_1.updateProduct)(1, mock_data_1.createProductInputMock);
            expect(product).toBeNull();
        }));
    });
    describe('Delete Product', () => {
        it('should delete and return product', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.product.delete.mockResolvedValue(mock_data_1.mockProduct);
            const product = yield (0, product_1.deleteProduct)(1);
            expect(product).toBe(mock_data_1.mockProduct);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.product.delete.mockRejectedValue(new Error(errorMessage));
            const product = yield (0, product_1.deleteProduct)(1);
            expect(product).toBeNull();
        }));
    });
    describe('read Product by id', () => {
        it('should read and return product', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.product.findUnique.mockResolvedValue(mock_data_1.mockProduct);
            const product = yield (0, product_1.readProductById)(1);
            expect(product).toBe(mock_data_1.mockProduct);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.product.findUnique.mockRejectedValue(new Error(errorMessage));
            const product = yield (0, product_1.readProductById)(1);
            expect(product).toBeNull();
        }));
    });
    describe('get product count', () => {
        it('should return product counts', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.product.count.mockResolvedValue(1);
            const count = yield (0, product_1.getProductCount)();
            expect(count).toBe(1);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.product.count.mockRejectedValue(new Error(errorMessage));
            const count = yield (0, product_1.getProductCount)();
            expect(count).toBeNull();
        }));
    });
    describe('read all Product', () => {
        it('should read and return products', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.product.findMany.mockResolvedValue([mock_data_1.mockProduct]);
            const product = yield (0, product_1.readAllProducts)();
            expect(product).toStrictEqual([mock_data_1.mockProduct]);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.product.findMany.mockRejectedValue(new Error(errorMessage));
            const product = yield (0, product_1.readAllProducts)();
            expect(product).toBeNull();
        }));
    });
});
