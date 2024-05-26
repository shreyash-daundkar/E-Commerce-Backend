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
exports.getAllProducts = exports.getProductById = void 0;
const product_1 = require("../services/product");
const exceptions_1 = require("../errors/exceptions");
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const product = yield (0, product_1.readProductById)(id);
        if (!product)
            throw new Error('Error reading product');
        return res.status(200).json({
            message: 'Get Product successfully',
            data: product,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.getProductById = getProductById;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, take } = req.query;
        const products = yield (0, product_1.readAllProducts)(skip ? +skip : 0, take ? +take : 5);
        if (!products)
            throw new Error('Error reading products');
        const count = yield (0, product_1.getProductCount)();
        if (count === null) {
            throw new Error('Error counting products');
        }
        return res.status(200).json({
            message: 'Get Products successfully',
            data: products,
            count,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.getAllProducts = getAllProducts;
