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
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        if (user.isAdmin) {
            return next();
        }
        return next(new exceptions_1.UnauthorizedException('No admin access', codes_1.ErrorCode.NO_ADMIN_ACCESS, null));
    }
    catch (error) {
        next(new exceptions_1.InternalException(error));
    }
});
exports.default = adminMiddleware;
