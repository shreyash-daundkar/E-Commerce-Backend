import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../../services/user";
import { compare, hash } from "bcrypt";
import { mockUser } from "../mock.data";
import { login, signUp } from "../../controllers/auth";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/variables";
import { BadRequestException, InternalException, NotFoundException } from "../../errors/exceptions";
import { ErrorCode } from "../../errors/codes";
import { signUpSchema } from "../../schema/user";



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
        const signUpSchemaParseMock = jest.spyOn(signUpSchema, 'parse');
    });
    
    afterEach(() => jest.clearAllMocks());
    


    describe('Sign up', () => {
        
        req = { body: { name: 'Test User', email: 'test@example.com', password: 'password' }};

        it('Should create user and give success responce', async () => {

            (signUpSchema.parse as jest.Mock).mockResolvedValue(req.body);
            (getUserByEmail as jest.Mock).mockResolvedValue(null);
            (hash as jest.Mock).mockResolvedValue('password');
            (createUser as jest.Mock).mockResolvedValue(mockUser);

            await signUp(req as Request, res as Response, next);
            
            expect(signUpSchema.parse).toHaveBeenCalledWith(req.body);
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
            
            (signUpSchema.parse as jest.Mock).mockResolvedValue(req.body);
            (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
            (hash as jest.Mock).mockResolvedValue('password');
            (createUser as jest.Mock).mockResolvedValue(mockUser);
            
            const badRequestException = new BadRequestException(
                'User already exists!', 
                ErrorCode.USER_ALREADY_EXIST, 
                null,
            )
            
            await signUp(req as Request, res as Response, next);
            
            expect(signUpSchema.parse).toHaveBeenCalledWith(req.body);
            expect(signUpSchema.parse).toHaveBeenCalledWith(req.body);
            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(next).toHaveBeenCalledWith(badRequestException);
            expect(hash).not.toHaveBeenCalled();
            expect(createUser).not.toHaveBeenCalled();
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

            const notFoundException = new NotFoundException(
                'User not exists!', 
                ErrorCode.USER_NOT_FOUND, 
                null
            );

            await login(req as Request, res as Response, next);

            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(next).toHaveBeenCalledWith(notFoundException);
            expect(compare).not.toHaveBeenCalled();
            expect(sign).not.toHaveBeenCalled();
        });


        it('Should return fail responce if password is wrong', async () => {

            (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
            (compare as jest.Mock).mockResolvedValue(false);
            (sign as jest.Mock).mockResolvedValue(mockJwt);

            const badRequestException = new BadRequestException(
                'Wrong password!', 
                ErrorCode.INCORRECT_PASSWORD, 
                null,
            )

            await login(req as Request, res as Response, next);

            expect(getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
            expect(next).toHaveBeenCalledWith(badRequestException);
            expect(sign).not.toHaveBeenCalled();
        });
   });
});