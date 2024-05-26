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
const exceptions_1 = require("../errors/exceptions");
const codes_1 = require("../errors/codes");
const user_1 = require("../services/user");
const jsonwebtoken_1 = require("jsonwebtoken");
const variables_1 = require("../utils/variables");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(new exceptions_1.UnauthorizedException('Token not found', codes_1.ErrorCode.TOKEN_NOT_FOUND, null));
        }
        const payload = yield (0, jsonwebtoken_1.verify)(token, variables_1.JWT_SECRET);
        if (typeof payload === 'string' || payload === null) {
            return next(new exceptions_1.UnauthorizedException(payload, codes_1.ErrorCode.TOKEN_INVAID, null));
        }
        const user = yield (0, user_1.getUserById)(payload.userId);
        if (!user) {
            return next(new exceptions_1.NotFoundException('User not found', codes_1.ErrorCode.USER_NOT_FOUND, null));
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        next(new exceptions_1.InternalException(error));
    }
});
exports.default = authMiddleware;
