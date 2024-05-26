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
const mock_data_1 = require("../mock.data");
const order_1 = require("../../services/order");
const order_2 = require("../../controllers/order");
const exceptions_1 = require("../../errors/exceptions");
const codes_1 = require("../../errors/codes");
jest.mock('../../services/cart', () => ({
    getCartItemsByUserId: jest.fn(),
}));
jest.mock('../../services/order', () => ({
    createOrder: jest.fn(),
    getOrders: jest.fn(),
    updateOrder: jest.fn(),
}));
let req;
let res;
let next;
describe('Order controller', () => {
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });
    afterEach(() => jest.clearAllMocks());
    describe('Create Order', () => {
        beforeEach(() => {
            req = {
                body: {
                    user: {
                        id: 1,
                    },
                },
            };
        });
        it('should fetch cart, make order and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_1.getCartItemsByUserId.mockResolvedValue([mock_data_1.mockCartItemWithProduct]);
            order_1.createOrder.mockResolvedValue(mock_data_1.mockOrder);
            yield (0, order_2.makeOrder)(req, res, next);
            expect(cart_1.getCartItemsByUserId).toHaveBeenCalledWith(1);
            expect(order_1.createOrder).toHaveBeenCalledWith(mock_data_1.createOrderInputMock);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Maked order successfully',
                data: mock_data_1.mockOrder,
                success: true,
            });
        }));
        it('should called next with not found exception if cart is empty', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_1.getCartItemsByUserId.mockResolvedValue([]);
            order_1.createOrder.mockResolvedValue(mock_data_1.mockOrder);
            const notFoundException = new exceptions_1.NotFoundException('Not found cart items', codes_1.ErrorCode.CART_ITEM_NOT_FOUND, null);
            yield (0, order_2.makeOrder)(req, res, next);
            expect(cart_1.getCartItemsByUserId).toHaveBeenCalledWith(1);
            expect(order_1.createOrder).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(notFoundException);
        }));
        it('should return internal exception if error getting cart', () => __awaiter(void 0, void 0, void 0, function* () {
            cart_1.getCartItemsByUserId.mockResolvedValue(null);
            order_1.createOrder.mockResolvedValue(mock_data_1.mockOrder);
            const error = new Error('Error getting cart items');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, order_2.makeOrder)(req, res, next);
            expect(cart_1.getCartItemsByUserId).toHaveBeenCalledWith(1);
            expect(order_1.createOrder).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('Get Orders', () => {
        beforeEach(() => {
            req = {
                body: {
                    user: {
                        id: 1,
                    },
                },
            };
        });
        it('should fetch order and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            order_1.getOrders.mockResolvedValue([mock_data_1.mockOrder]);
            yield (0, order_2.getOrdersByUserId)(req, res, next);
            expect(order_1.getOrders).toHaveBeenCalledWith(1);
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
            yield (0, order_2.getOrdersByUserId)(req, res, next);
            expect(order_1.getOrders).toHaveBeenCalledWith(1);
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('Cancel Orders', () => {
        beforeEach(() => {
            req = {
                params: {
                    id: "1",
                },
            };
        });
        it('should cancel order and return success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            order_1.updateOrder.mockResolvedValue(mock_data_1.mockOrder);
            yield (0, order_2.cancelOrder)(req, res, next);
            expect(order_1.updateOrder).toHaveBeenCalledWith(mock_data_1.updateOrderInputMock);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Order cancled successfully",
                data: mock_data_1.mockOrder,
                success: true,
            });
        }));
        it('should return internal exception if error cancleling order', () => __awaiter(void 0, void 0, void 0, function* () {
            order_1.updateOrder.mockResolvedValue(null);
            const error = new Error('Error updating order');
            const internalException = new exceptions_1.InternalException(error);
            yield (0, order_2.cancelOrder)(req, res, next);
            expect(order_1.updateOrder).toHaveBeenCalledWith(mock_data_1.updateOrderInputMock);
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
});
