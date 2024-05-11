import { Request, Response, NextFunction } from "express";
import { HttpException } from "../errors/exceptions";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        
        console.log(error.message, error.error);

        res.status(error.statusCode).json({
            message: error.message,
            error: error.error,
            errorCode: error.errorCode,
            success: false,
        });

    } catch (error) {
        console.log('Error in error middleware', error);

        res.status(500).json({
            message: 'Error in error middleware',
            error: error,
            success: false,
        });
    }
}

export default errorMiddleware;