"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityException = exports.InternalException = exports.UnauthorizedException = exports.NotFoundException = exports.BadRequestException = exports.HttpException = void 0;
const codes_1 = require("./codes");
class HttpException extends Error {
    constructor(message, errorCode, error, statusCode) {
        super(message);
        this.errorCode = errorCode;
        this.error = error;
        this.statusCode = statusCode;
    }
    ;
}
exports.HttpException = HttpException;
class BadRequestException extends HttpException {
    constructor(message, errorCode, error) {
        super(message, errorCode, error, 400);
    }
    ;
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends HttpException {
    constructor(message, errorCode, error) {
        super(message, errorCode, error, 404);
    }
    ;
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends HttpException {
    constructor(message, errorCode, error) {
        super(message, errorCode, error, 401);
    }
    ;
}
exports.UnauthorizedException = UnauthorizedException;
class InternalException extends HttpException {
    constructor(error) {
        super('Internal Exception', codes_1.ErrorCode.INTERNAL_EXCEPTION, error, 500);
    }
    ;
}
exports.InternalException = InternalException;
class UnprocessableEntityException extends HttpException {
    constructor(error) {
        super('Unprocessable Entity', codes_1.ErrorCode.UNPROCESSABLEENTITY, error, 422);
    }
    ;
}
exports.UnprocessableEntityException = UnprocessableEntityException;
