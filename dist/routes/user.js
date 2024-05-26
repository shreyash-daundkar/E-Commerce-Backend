"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = require("../errors/handler");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter.get('/me', (0, handler_1.errorHandler)(user_1.me));
exports.default = userRouter;
