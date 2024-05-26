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
exports.getCart = exports.removeFromCart = exports.addToCart = void 0;
const cart_1 = require("../schema/cart");
const cart_2 = require("../services/cart");
const exceptions_1 = require("../errors/exceptions");
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        cart_1.addToCartSchema.parse(req.body);
        const { productId, quantity, user } = req.body;
        const cartItem = yield (0, cart_2.createCartItem)({
            userId: user.id,
            productId,
            quantity,
        });
        if (!cartItem)
            throw new Error('Error creating cart item');
        return res.status(201).json({
            message: 'Add to cart successfully',
            data: cartItem,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const user = req.body.user;
        const cartItem = yield (0, cart_2.deleteCartItem)(id, user.id);
        if (!cartItem)
            throw new Error('Error deleting cart item');
        return res.status(201).json({
            message: 'Delete from cart successfully',
            data: cartItem,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.removeFromCart = removeFromCart;
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const cart = yield (0, cart_2.getCartItemsByUserId)(user.id);
        if (!cart)
            throw new Error('Error getting cart');
        return res.status(201).json({
            message: 'Fetch cart successfully',
            data: cart,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.getCart = getCart;
