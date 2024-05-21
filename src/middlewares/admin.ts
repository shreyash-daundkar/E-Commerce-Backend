import { Request, Response, NextFunction } from "express";
import { InternalException, UnauthorizedException } from "../errors/exceptions";
import { User } from "../services/prisma";
import { ErrorCode } from "../errors/codes";

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = req.body.user;

        if(user.isAdmin) {
            return next();
        }

        return next(new UnauthorizedException('No admin access', ErrorCode.NO_ADMIN_ACCESS, null));

    } catch (error) {
        next(new InternalException(error));
    }
}

export default adminMiddleware;