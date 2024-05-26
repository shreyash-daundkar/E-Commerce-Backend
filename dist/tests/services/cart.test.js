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
const cart_1 = require("../../services/cart");
const prisma_1 = __importDefault(require("../../services/prisma"));
const mock_data_1 = require("../mock.data");
jest.mock("../../services/prisma", () => ({
    cartItem: {
        findMany: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
    },
}));
describe('Cart Service', () => {
    describe('Create Cart Item', () => {
        it('should create and return carItem', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.cartItem.upsert.mockResolvedValue(mock_data_1.mockCartItem);
            const cartItem = yield (0, cart_1.createCartItem)(mock_data_1.createCartItemInputMock);
            expect(cartItem).toBe(mock_data_1.mockCartItem);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.cartItem.upsert.mockRejectedValue(new Error(errorMessage));
            const cartItem = yield (0, cart_1.createCartItem)(mock_data_1.createCartItemInputMock);
            expect(cartItem).toBeNull();
        }));
    });
    describe('Delete Cart Item', () => {
        it('should delete and return carItem', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.cartItem.delete.mockResolvedValue(mock_data_1.mockCartItem);
            const cartItem = yield (0, cart_1.deleteCartItem)(1, 1);
            expect(cartItem).toBe(mock_data_1.mockCartItem);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.cartItem.delete.mockRejectedValue(new Error(errorMessage));
            const cartItem = yield (0, cart_1.deleteCartItem)(1, 1);
            expect(cartItem).toBeNull();
        }));
    });
    describe('Get Cart Items by user id', () => {
        it('should get cart items by user id and return carItems', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.cartItem.findMany.mockResolvedValue([mock_data_1.mockCartItem]);
            const cartItems = yield (0, cart_1.getCartItemsByUserId)(1);
            expect(cartItems).toStrictEqual([mock_data_1.mockCartItem]);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.cartItem.findMany.mockRejectedValue(new Error(errorMessage));
            const cartItems = yield (0, cart_1.getCartItemsByUserId)(1);
            expect(cartItems).toBeNull();
        }));
    });
});
