"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    try {
        console.log(error.message, error.error);
        res.status(error.statusCode).json({
            message: error.message,
            error: error.error,
            errorCode: error.errorCode,
            success: false,
        });
    }
    catch (error) {
        console.log('Error in error middleware', error);
        res.status(500).json({
            message: 'Error in error middleware',
            error: error,
            success: false,
        });
    }
};
exports.default = errorMiddleware;
