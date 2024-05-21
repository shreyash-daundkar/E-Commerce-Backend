import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import { createUser, getUserByEmail } from "../services/user";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/variables";
import { BadRequestException, InternalException, NotFoundException } from "../errors/exceptions";
import { ErrorCode } from "../errors/codes";
import { signUpSchema } from "../schema/user";


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        signUpSchema.parse(req.body);
    
        const { name, email, password } = req.body;
    
        let user = await getUserByEmail(email);
    
        if (user) {
            return next( new BadRequestException(
                'User already exists!', 
                ErrorCode.USER_ALREADY_EXIST, 
                null,
            ));
        }
    
        const encryptPassword = await hash(password, 10);
    
        user = await createUser({
            name, 
            email, 
            password: encryptPassword,
        });
    
        if(!user) {
            throw new Error('Error creating user');
        }
    
        return res.status(201).json({
            message: 'User created successfully', 
            data: user,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }

};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
    
        let user = await getUserByEmail(email);
    
        if (!user) {
            return next( new NotFoundException(
                'User not exists!', 
                ErrorCode.USER_NOT_FOUND, 
                null
            ));
        }
    
        const passwordVerified = await compare(password, user!.password);
    
        if(!passwordVerified) {
            return next( new BadRequestException(
                'Wrong password!', 
                ErrorCode.INCORRECT_PASSWORD, 
                null
            ));
        }
    
        const token = await sign({
            userId: user!.id,
        }, JWT_SECRET);
    
        return res.status(201).json({
            message: 'Login successfully', 
            data: token,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }

};