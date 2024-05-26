"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    // Bad Request
    ErrorCode[ErrorCode["USER_ALREADY_EXIST"] = 1001] = "USER_ALREADY_EXIST";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    // Not Found
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 2001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["PRODUCT_NOT_FOUND"] = 2002] = "PRODUCT_NOT_FOUND";
    ErrorCode[ErrorCode["CART_ITEM_NOT_FOUND"] = 2003] = "CART_ITEM_NOT_FOUND";
    // Internal
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
    // Unprocessable
    ErrorCode[ErrorCode["UNPROCESSABLEENTITY"] = 4001] = "UNPROCESSABLEENTITY";
    // Unauthorized
    ErrorCode[ErrorCode["TOKEN_NOT_FOUND"] = 5001] = "TOKEN_NOT_FOUND";
    ErrorCode[ErrorCode["TOKEN_INVAID"] = 5002] = "TOKEN_INVAID";
    ErrorCode[ErrorCode["WRONG_TOKEN"] = 5003] = "WRONG_TOKEN";
    ErrorCode[ErrorCode["NO_ADMIN_ACCESS"] = 5004] = "NO_ADMIN_ACCESS";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
