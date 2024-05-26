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
exports.completeOrder = exports.getAllActiveOrders = exports.removeProduct = exports.editProduct = exports.addProduct = void 0;
const product_1 = require("../schema/product");
const product_2 = require("../services/product");
const exceptions_1 = require("../errors/exceptions");
const order_1 = require("../services/order");
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        product_1.createProductSchema.parse(req.body);
        const { name, description, price, tags } = req.body;
        const product = yield (0, product_2.createProduct)({
            name,
            description,
            price,
            tags,
        });
        if (!product)
            throw new Error('Error creating product');
        return res.status(201).json({
            message: 'Product created successfully',
            data: product,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.addProduct = addProduct;
const editProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { updatedData } = req.body;
        const id = +req.params.id;
        const product = yield (0, product_2.updateProduct)(id, updatedData);
        if (!product)
            throw new Error('Error editing product');
        return res.status(201).json({
            message: 'Product edited successfully',
            data: product,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.editProduct = editProduct;
const removeProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const product = yield (0, product_2.deleteProduct)(id);
        if (!product)
            throw new Error('Error deleting product');
        return res.status(200).json({
            message: 'Product removed successfully',
            data: product,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.removeProduct = removeProduct;
const getAllActiveOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_1.getOrders)();
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
exports.getAllActiveOrders = getAllActiveOrders;
const completeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const order = yield (0, order_1.updateOrder)({
            id,
            isActive: false,
            isComplete: true,
        });
        if (!order) {
            throw new Error('Error updating order');
        }
        return res.status(201).json({
            message: 'Order completing successfully',
            data: order,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.completeOrder = completeOrder;
