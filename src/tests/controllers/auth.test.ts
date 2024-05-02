import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../../services/user";
import { hash } from "bcrypt";
import { mockUser } from "../mock.data";
import { signUp } from "../../controllers/auth";



jest.mock('../../services/user', () => ({
    getUserByEmail: jest.fn(),
    createUser: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
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
            expect(hash).not.toHaveBeenCalledWith();
            expect(createUser).not.toHaveBeenCalledWith();
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
});