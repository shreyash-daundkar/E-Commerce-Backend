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
exports.login = exports.signUp = void 0;
const bcrypt_1 = require("bcrypt");
const user_1 = require("../services/user");
const jsonwebtoken_1 = require("jsonwebtoken");
const variables_1 = require("../utils/variables");
const exceptions_1 = require("../errors/exceptions");
const codes_1 = require("../errors/codes");
const user_2 = require("../schema/user");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user_2.signUpSchema.parse(req.body);
        const { name, email, password } = req.body;
        let user = yield (0, user_1.getUserByEmail)(email);
        if (user) {
            return next(new exceptions_1.BadRequestException('User already exists!', codes_1.ErrorCode.USER_ALREADY_EXIST, null));
        }
        const encryptPassword = yield (0, bcrypt_1.hash)(password, 10);
        user = yield (0, user_1.createUser)({
            name,
            email,
            password: encryptPassword,
        });
        if (!user) {
            throw new Error('Error creating user');
        }
        return res.status(201).json({
            message: 'User created successfully',
            data: user,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield (0, user_1.getUserByEmail)(email);
        if (!user) {
            return next(new exceptions_1.NotFoundException('User not exists!', codes_1.ErrorCode.USER_NOT_FOUND, null));
        }
        const passwordVerified = yield (0, bcrypt_1.compare)(password, user.password);
        if (!passwordVerified) {
            return next(new exceptions_1.BadRequestException('Wrong password!', codes_1.ErrorCode.INCORRECT_PASSWORD, null));
        }
        const token = yield (0, jsonwebtoken_1.sign)({
            userId: user.id,
        }, variables_1.JWT_SECRET);
        return res.status(201).json({
            message: 'Login successfully',
            data: token,
            success: true,
        });
    }
    catch (error) {
        return next(new exceptions_1.InternalException(error));
    }
});
exports.login = login;
