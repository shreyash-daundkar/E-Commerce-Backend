"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../services/user");
const bcrypt_1 = require("bcrypt");
const mock_data_1 = require("../mock.data");
const auth_1 = require("../../controllers/auth");
const jsonwebtoken_1 = require("jsonwebtoken");
const variables_1 = require("../../utils/variables");
const exceptions_1 = require("../../errors/exceptions");
const codes_1 = require("../../errors/codes");
const user_2 = require("../../schema/user");
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
let req;
let res;
let next;
describe('User controller', () => {
    beforeEach(() => {
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        const signUpSchemaParseMock = jest.spyOn(user_2.signUpSchema, 'parse');
    });
    afterEach(() => jest.clearAllMocks());
    describe('Sign up', () => {
        req = { body: { name: 'Test User', email: 'test@example.com', password: 'password' } };
        it('Should create user and give success responce', () => __awaiter(void 0, void 0, void 0, function* () {
            user_2.signUpSchema.parse.mockResolvedValue(req.body);
            user_1.getUserByEmail.mockResolvedValue(null);
            bcrypt_1.hash.mockResolvedValue('password');
            user_1.createUser.mockResolvedValue(mock_data_1.mockUser);
            yield (0, auth_1.signUp)(req, res, next);
            expect(user_2.signUpSchema.parse).toHaveBeenCalledWith(req.body);
            expect(user_1.getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(bcrypt_1.hash).toHaveBeenCalledWith(req.body.password, 10);
            expect(user_1.createUser).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User created successfully',
                data: mock_data_1.mockUser,
                success: true,
            });
        }));
        it('Should give fail responce if user exist already', () => __awaiter(void 0, void 0, void 0, function* () {
            user_2.signUpSchema.parse.mockResolvedValue(req.body);
            user_1.getUserByEmail.mockResolvedValue(mock_data_1.mockUser);
            bcrypt_1.hash.mockResolvedValue('password');
            user_1.createUser.mockResolvedValue(mock_data_1.mockUser);
            const badRequestException = new exceptions_1.BadRequestException('User already exists!', codes_1.ErrorCode.USER_ALREADY_EXIST, null);
            yield (0, auth_1.signUp)(req, res, next);
            expect(user_2.signUpSchema.parse).toHaveBeenCalledWith(req.body);
            expect(user_2.signUpSchema.parse).toHaveBeenCalledWith(req.body);
            expect(user_1.getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(next).toHaveBeenCalledWith(badRequestException);
            expect(bcrypt_1.hash).not.toHaveBeenCalled();
            expect(user_1.createUser).not.toHaveBeenCalled();
        }));
        it('Should give fail responce if ger error creating user', () => __awaiter(void 0, void 0, void 0, function* () {
            user_2.signUpSchema.parse.mockResolvedValue(req.body);
            user_1.getUserByEmail.mockResolvedValue(null);
            bcrypt_1.hash.mockResolvedValue('password');
            user_1.createUser.mockResolvedValue(null);
            const internalException = new exceptions_1.InternalException(new Error('User already exists!'));
            yield (0, auth_1.signUp)(req, res, next);
            expect(user_2.signUpSchema.parse).toHaveBeenCalledWith(req.body);
            expect(user_2.signUpSchema.parse).toHaveBeenCalledWith(req.body);
            expect(user_1.getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(bcrypt_1.hash).toHaveBeenCalled();
            expect(user_1.createUser).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(internalException);
        }));
    });
    describe('login', () => {
        req = { body: { email: 'test@example.com', password: 'password' } };
        const mockJwt = 'jdlsdnldswebfwjbej';
        it('Should verify user and send jwt token', () => __awaiter(void 0, void 0, void 0, function* () {
            user_1.getUserByEmail.mockResolvedValue(mock_data_1.mockUser);
            bcrypt_1.compare.mockResolvedValue(true);
            jsonwebtoken_1.sign.mockResolvedValue(mockJwt);
            yield (0, auth_1.login)(req, res, next);
            expect(user_1.getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(bcrypt_1.compare).toHaveBeenCalledWith(req.body.password, mock_data_1.mockUser.password);
            expect(jsonwebtoken_1.sign).toHaveBeenCalledWith({ userId: mock_data_1.mockUser.id }, variables_1.JWT_SECRET);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Login successfully',
                data: mockJwt,
                success: true,
            });
        }));
        it('Should return fail responce if user not exists', () => __awaiter(void 0, void 0, void 0, function* () {
            user_1.getUserByEmail.mockResolvedValue(null);
            bcrypt_1.compare.mockResolvedValue(true);
            jsonwebtoken_1.sign.mockResolvedValue(mockJwt);
            const notFoundException = new exceptions_1.NotFoundException('User not exists!', codes_1.ErrorCode.USER_NOT_FOUND, null);
            yield (0, auth_1.login)(req, res, next);
            expect(user_1.getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(next).toHaveBeenCalledWith(notFoundException);
            expect(bcrypt_1.compare).not.toHaveBeenCalled();
            expect(jsonwebtoken_1.sign).not.toHaveBeenCalled();
        }));
        it('Should return fail responce if password is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
            user_1.getUserByEmail.mockResolvedValue(mock_data_1.mockUser);
            bcrypt_1.compare.mockResolvedValue(false);
            jsonwebtoken_1.sign.mockResolvedValue(mockJwt);
            const badRequestException = new exceptions_1.BadRequestException('Wrong password!', codes_1.ErrorCode.INCORRECT_PASSWORD, null);
            yield (0, auth_1.login)(req, res, next);
            expect(user_1.getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(bcrypt_1.compare).toHaveBeenCalledWith(req.body.password, mock_data_1.mockUser.password);
            expect(next).toHaveBeenCalledWith(badRequestException);
            expect(jsonwebtoken_1.sign).not.toHaveBeenCalled();
        }));
    });
});
