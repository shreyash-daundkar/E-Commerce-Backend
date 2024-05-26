"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const orderRouter = (0, express_1.Router)();
orderRouter.get('/', order_1.getOrdersByUserId);
orderRouter.post('/', order_1.makeOrder);
orderRouter.delete('/:id', order_1.cancelOrder);
exports.default = orderRouter;
