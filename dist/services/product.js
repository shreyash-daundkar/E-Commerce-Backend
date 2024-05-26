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
exports.readAllProducts = exports.getProductCount = exports.readProductById = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.default.product.create({ data });
        return product;
    }
    catch (error) {
        console.log("Error creating product", error);
        return null;
    }
});
exports.createProduct = createProduct;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.default.product.update({
            where: { id },
            data,
        });
        return product;
    }
    catch (error) {
        console.log("Error updating product", error);
        return null;
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.default.product.delete({
            where: { id }
        });
        return product;
    }
    catch (error) {
        console.log("Error deleting product", error);
        return null;
    }
});
exports.deleteProduct = deleteProduct;
const readProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.default.product.findUnique({
            where: { id }
        });
        return product;
    }
    catch (error) {
        console.log("Error reading product", error);
        return null;
    }
});
exports.readProductById = readProductById;
const getProductCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield prisma_1.default.product.count();
        return count;
    }
    catch (error) {
        console.log("Error counting product", error);
        return null;
    }
});
exports.getProductCount = getProductCount;
const readAllProducts = (skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma_1.default.product.findMany({
            skip: skip || 0,
            take: take || 5,
        });
        return products;
    }
    catch (error) {
        console.log("Error reading product", error);
        return null;
    }
});
exports.readAllProducts = readAllProducts;
