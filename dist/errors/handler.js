"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const exceptions_1 = require("./exceptions");
const errorHandler = (func) => {
    return (req, res, next) => {
        try {
            func(req, res, next);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return next(new exceptions_1.UnprocessableEntityException(error));
            }
            return next(new exceptions_1.InternalException(error));
        }
    };
};
exports.errorHandler = errorHandler;
