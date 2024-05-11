import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod";
import { InternalException, UnprocessableEntityException } from "./exceptions";

export const errorHandler = (func: Function) => {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            func(req, res, next);

        } catch (error) {

            if(error instanceof ZodError) {
                return next(new UnprocessableEntityException(error));
            }

            return next( new InternalException(error));
        }
    }
}