"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_1 = require("../controllers/cart");
const cartRouter = (0, express_1.Router)();
cartRouter.get('/', cart_1.getCart);
cartRouter.post('/', cart_1.addToCart);
cartRouter.delete('/:id', cart_1.removeFromCart);
exports.default = cartRouter;
