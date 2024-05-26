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
exports.cancelOrder = exports.getOrdersByUserId = exports.makeOrder = void 0;
const cart_1 = require("../services/cart");
const exceptions_1 = require("../errors/exceptions");
const codes_1 = require("../errors/codes");
const order_1 = require("../services/order");
const makeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const cartItems = yield (0, cart_1.getCartItemsByUserId)(user.id);
        if (!cartItems) {
            throw new Error('Error getting cart items');
        }
        if (cartItems.length === 0) {
            return next(new exceptions_1.NotFoundException('Not found cart items', codes_1.ErrorCode.CART_ITEM_NOT_FOUND, null));
        }
        let amount = 0;
        const products = cartItems.map(item => {
            amount += item.quantity * item.product.price;
            return {
                productId: item.productId,
                quantity: item.quantity,
            };
        });
        const order = yield (0, order_1.createOrder)({
            userId: user.id,
            amount,
            products,
        });
        if (!order) {
            throw new Error('Error creating order');
        }
        return res.status(201).json({
            message: 'Maked order successfully',
            data: order,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.makeOrder = makeOrder;
const getOrdersByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const orders = yield (0, order_1.getOrders)(user.id);
        if (!orders) {
            throw new Error('Error getting orders');
        }
        return res.status(201).json({
            message: 'Fetched orders successfully',
            data: orders,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
const cancelOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const order = yield (0, order_1.updateOrder)({
            id,
            isActive: false,
        });
        if (!order) {
            throw new Error('Error updating order');
        }
        return res.status(201).json({
            message: 'Order cancled successfully',
            data: order,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.cancelOrder = cancelOrder;
