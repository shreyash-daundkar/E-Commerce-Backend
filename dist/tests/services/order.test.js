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
const order_1 = require("../../services/order");
const prisma_1 = __importDefault(require("../../services/prisma"));
const mock_data_1 = require("../mock.data");
jest.mock("../../services/prisma", () => ({
    $transaction: jest.fn(),
    order: {
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
    },
    cartItem: {
        deleteMany: jest.fn(),
    },
}));
describe('Order Service', () => {
    describe('Create Order', () => {
        it('should create and return order', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.order.create.mockResolvedValue(mock_data_1.mockOrder);
            prisma_1.default.cartItem.deleteMany.mockResolvedValue([mock_data_1.mockCartItem]);
            prisma_1.default.$transaction.mockResolvedValue(mock_data_1.mockOrder);
            const order = yield (0, order_1.createOrder)(mock_data_1.createOrderInputMock);
            expect(order).toBe(mock_data_1.mockOrder);
        }));
        it('should return null if create order failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.order.create.mockRejectedValue(new Error(errorMessage));
            prisma_1.default.cartItem.deleteMany.mockResolvedValue([mock_data_1.mockCartItem]);
            prisma_1.default.$transaction.mockResolvedValue(null);
            const order = yield (0, order_1.createOrder)(mock_data_1.createOrderInputMock);
            expect(prisma_1.default.cartItem.deleteMany).not.toHaveBeenCalled();
            expect(order).toBeNull();
        }));
        it('should return null if delete cart items failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.order.create.mockResolvedValue(mock_data_1.mockOrder);
            prisma_1.default.cartItem.deleteMany.mockRejectedValue(new Error(errorMessage));
            prisma_1.default.$transaction.mockResolvedValue(null);
            const order = yield (0, order_1.createOrder)(mock_data_1.createOrderInputMock);
            expect(order).toBeNull();
        }));
    });
    describe('Update Order', () => {
        it('should update and return order', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.order.update.mockResolvedValue(mock_data_1.mockOrder);
            const order = yield (0, order_1.updateOrder)(mock_data_1.updateOrderInputMock);
            expect(order).toBe(mock_data_1.mockOrder);
        }));
        it('should return null if update order failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.order.update.mockRejectedValue(new Error(errorMessage));
            const order = yield (0, order_1.updateOrder)(mock_data_1.updateOrderInputMock);
            expect(order).toBeNull();
        }));
    });
    describe('Get Order', () => {
        it('should get and return order', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.order.findMany.mockResolvedValue([mock_data_1.mockOrder]);
            const order = yield (0, order_1.getOrders)(1);
            expect(order).toStrictEqual([mock_data_1.mockOrder]);
        }));
        it('should return null if get order failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.order.findMany.mockRejectedValue(new Error(errorMessage));
            const order = yield (0, order_1.getOrders)(1);
            expect(order).toBeNull();
        }));
    });
});
