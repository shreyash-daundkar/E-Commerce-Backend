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
exports.getCartItemsByUserId = exports.deleteCartItem = exports.createCartItem = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const createCartItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { productId, userId, quantity } = data;
        const cartItem = yield prisma_1.default.cartItem.upsert({
            where: {
                userId_productId: {
                    userId,
                    productId
                },
            },
            update: {
                quantity: {
                    increment: quantity,
                },
            },
            create: data,
        });
        return cartItem;
    }
    catch (error) {
        console.log("Error creating cart item", error);
        return null;
    }
});
exports.createCartItem = createCartItem;
const deleteCartItem = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItem = yield prisma_1.default.cartItem.delete({
            where: {
                id,
                userId,
            },
        });
        return cartItem;
    }
    catch (error) {
        console.log("Error deleting cart item", error);
        return null;
    }
});
exports.deleteCartItem = deleteCartItem;
const getCartItemsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield prisma_1.default.cartItem.findMany({
            where: {
                userId: id,
            },
            include: {
                product: true,
            }
        });
        return cartItems;
    }
    catch (error) {
        console.log("Error deleting cart item", error);
        return null;
    }
});
exports.getCartItemsByUserId = getCartItemsByUserId;
