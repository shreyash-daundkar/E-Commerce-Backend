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
const cart_1 = require("../../services/cart");
const cart_2 = require("../../schema/cart");
const mock_data_1 = require("../mock.data");
const cart_3 = require("../../controllers/cart");
const exceptions_1 = require("../../errors/exceptions");
jest.mock('../../services/cart', () => ({
    createCartItem: jest.fn(),
    deleteCartItem: jest.fn(),
    getCartItemsByUserId: jest.fn(),
}));
let req;
let res;
let next;
describe('cart controller', () => {
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        const signUpSchemaParseMock = jest.spyOn(cart_2.addToCartSchema, 'parse');
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
            };
        });
        it('should add to cart and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_2.addToCartSchema.parse.mockResolvedValue(req.body);
            cart_1.createCartItem.mockResolvedValue(mock_data_1.mockCartItem);
            yield (0, cart_3.addToCart)(req, res, next);
            expect(cart_2.addToCartSchema.parse).toHaveBeenCalledWith(req.body);
            expect(cart_1.createCartItem).toHaveBeenCalledWith({
                productId: 1,
                quantity: 1,
                userId: 1,
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Add to cart successfully',
                data: mock_data_1.mockCartItem,
                success: true,
            });
        }));
        it('should return internal exception if error adding to cart', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_2.addToCartSchema.parse.mockResolvedValue(req.body);
            cart_1.createCartItem.mockResolvedValue(null);
            const error = new Error('Error creating product');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, cart_3.addToCart)(req, res, next);
            expect(cart_2.addToCartSchema.parse).toHaveBeenCalledWith(req.body);
            expect(cart_1.createCartItem).toHaveBeenCalledWith({
                productId: 1,
                quantity: 1,
                userId: 1,
            });
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('Delete from cart', () => {
        beforeEach(() => {
            req = {
                body: {
                    user: {
                        id: 1,
                    },
                },
                params: {
                    id: '1',
                },
            };
        });
        it('should delete from cart and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_1.deleteCartItem.mockResolvedValue(mock_data_1.mockCartItem);
            yield (0, cart_3.removeFromCart)(req, res, next);
            expect(cart_1.deleteCartItem).toHaveBeenCalledWith(1, 1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Delete from cart successfully',
                data: mock_data_1.mockCartItem,
                success: true,
            });
        }));
        it('should return internal exception if error adding to cart', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_1.deleteCartItem.mockResolvedValue(null);
            const error = new Error('Error creating product');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, cart_3.removeFromCart)(req, res, next);
            expect(cart_1.deleteCartItem).toHaveBeenCalledWith(1, 1);
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('Get cart', () => {
        beforeEach(() => {
            req = {
                body: {
                    user: {
                        id: 1,
                    },
                },
            };
        });
        it('should fetch cart and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_1.getCartItemsByUserId.mockResolvedValue([mock_data_1.mockCartItem]);
            yield (0, cart_3.getCart)(req, res, next);
            expect(cart_1.getCartItemsByUserId).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Fetch cart successfully',
                data: [mock_data_1.mockCartItem],
                success: true,
            });
        }));
        it('should return internal exception if error getting cart', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_1.getCartItemsByUserId.mockResolvedValue(null);
            const error = new Error('Error creating product');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, cart_3.getCart)(req, res, next);
            expect(cart_1.getCartItemsByUserId).toHaveBeenCalledWith(1);
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
});
