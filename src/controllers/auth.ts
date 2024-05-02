import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import { createUser, getUserByEmail } from "../services/user";


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { name, email, password } = req.body;

        let user = await getUserByEmail(email);
        if (user) {
            throw Error('User already exists!');
        }

        const encryptPassword = await hash(password, 10);
        user = await createUser({ name, email, password: encryptPassword });

        res.status(201).json({
            message: 'User created successfully', 
            data: user,
            success: true,
        });

    } catch (error) {
        console.error('Error signing up:', error);

        return res.status(500).json({ 
            message: 'Failed to sign up',
            error,
            success: false,
         });
    }
};