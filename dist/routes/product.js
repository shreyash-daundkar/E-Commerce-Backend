"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const productRouter = (0, express_1.Router)();
productRouter.get('/:id', product_1.getProductById);
productRouter.get('/', product_1.getAllProducts);
exports.default = productRouter;
