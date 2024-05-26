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
exports.getOrders = exports.updateOrder = exports.createOrder = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, amount, products } = data;
        const order = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield prisma.order.create({
                data: {
                    userId,
                    amount,
                    products: {
                        create: products
                    },
                }
            });
            const deletedCartItems = yield prisma.cartItem.deleteMany({
                where: {
                    userId,
                }
            });
            return order;
        }));
        return order;
    }
    catch (error) {
        console.log("Error creating order", error);
        return null;
    }
});
exports.createOrder = createOrder;
const updateOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = data;
        const order = yield prisma_1.default.order.update({
            where: {
                id,
                isActive: true,
            },
            data: data,
        });
        return order;
    }
    catch (error) {
        console.log("Error deactivating order", error);
        return null;
    }
});
exports.updateOrder = updateOrder;
const getOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const where = userId ? { userId } : { isActive: true };
        const orders = yield prisma_1.default.order.findMany({ where });
        return orders;
    }
    catch (error) {
        console.log("Error deactivating order", error);
        return null;
    }
});
exports.getOrders = getOrders;
