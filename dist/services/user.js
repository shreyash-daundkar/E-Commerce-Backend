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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUserByEmail = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        return user;
    }
    catch (error) {
        console.log("Error fiding user by email", error);
        return null;
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id },
        });
        return user;
    }
    catch (error) {
        console.log("Error fiding user by email", error);
        return null;
    }
});
exports.getUserById = getUserById;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.create({ data });
        return user;
    }
    catch (error) {
        console.log("Error creating user", error);
        return null;
    }
});
exports.createUser = createUser;
