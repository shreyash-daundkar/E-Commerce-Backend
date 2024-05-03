import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../../services/user";
import { compare, hash } from "bcrypt";
import { mockUser } from "../mock.data";
import { login, signUp } from "../../controllers/auth";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/variables";



jest.mock('../../services/user', () => ({
    getUserByEmail: jest.fn(),
    createUser: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

let req: Partial<Request>;
let res: Partial<Response>;
let next: jest.MockedFunction<NextFunction>;



describe('User controller', () => {

    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });
    
    afterEach(() => jest.clearAllMocks());
    


    describe('Sign up', () => {
        
        req = { body: { name: 'Test User', email: 'test@example.com', password: 'password' }};


        it('Should create user and give success responce', async () => {

            (getUserByEmail as jest.Mock).mockResolvedValue(null);
            (hash as jest.Mock).mockResolvedValue('password');
            (createUser as jest.Mock).mockResolvedValue(mockUser);

            await signUp(req as Request, res as Response, next);

            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(hash).toHaveBeenCalledWith(req.body.password, 10);
            expect(createUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User created successfully', 
                data: mockUser,
                success: true,
            });
        });


        it('Should give fail responce if user exist already', async () => {
            
            (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
            (hash as jest.Mock).mockResolvedValue('password');
            (createUser as jest.Mock).mockResolvedValue(mockUser);

            await signUp(req as Request, res as Response, next);

            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(hash).not.toHaveBeenCalled();
            expect(createUser).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ 
                message: 'Failed to sign up',
                error: new Error('User already exists!'),
                success: false,
             });
        });


        it('Should give fail responce if get any error', async () => {
            
            (getUserByEmail as jest.Mock).mockResolvedValue(null);
            (hash as jest.Mock).mockResolvedValue('password');
            (createUser as jest.Mock).mockRejectedValue(new Error('Database Error'));

            await signUp(req as Request, res as Response, next);

            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(hash).toHaveBeenCalledWith(req.body.password, 10);
            expect(createUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ 
                message: 'Failed to sign up',
                error: new Error('Database Error'),
                success: false,
             });
        });
    });



    describe('login', () => {
        
        req = { body: { email: 'test@example.com', password: 'password' }};

        const mockJwt = 'jdlsdnldswebfwjbej';


        it('Should verify user and send jwt token', async () => {

            (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
            (compare as jest.Mock).mockResolvedValue(true);
            (sign as jest.Mock).mockResolvedValue(mockJwt);

            await login(req as Request, res as Response, next);

            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
            expect(sign).toHaveBeenCalledWith({ userId: mockUser.id }, JWT_SECRET);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Login successfully', 
                data: mockJwt,
                success: true,
            });
        });


        it('Should return fail responce if user not exists', async () => {

            (getUserByEmail as jest.Mock).mockResolvedValue(null);
            (compare as jest.Mock).mockResolvedValue(true);
            (sign as jest.Mock).mockResolvedValue(mockJwt);

            await login(req as Request, res as Response, next);

            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(compare).not.toHaveBeenCalled();
            expect(sign).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Failed to login',
                error: new Error('User not exists!'),
                success: false,
            });
        });


        it('Should return fail responce if password is wrong', async () => {

            (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
            (compare as jest.Mock).mockResolvedValue(false);
            (sign as jest.Mock).mockResolvedValue(mockJwt);

            await login(req as Request, res as Response, next);

            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
            expect(sign).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Failed to login',
                error: new Error('Wrong password!'),
                success: false,
            });
        });
    });
});