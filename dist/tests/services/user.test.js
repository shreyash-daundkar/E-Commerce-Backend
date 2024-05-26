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
const prisma_1 = __importDefault(require("../../services/prisma"));
const user_1 = require("../../services/user");
const mock_data_1 = require("../mock.data");
jest.mock("../../services/prisma", () => ({
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));
describe('User Service', () => {
    describe('Get user by Email', () => {
        it('should return user with given email', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.findUnique.mockResolvedValue(mock_data_1.mockUser);
            const user = yield (0, user_1.getUserByEmail)('test@gmail.com');
            expect(user).toBe(mock_data_1.mockUser);
        }));
        it('should return null if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.findUnique.mockResolvedValue(null);
            const user = yield (0, user_1.getUserByEmail)('test@gmail.com');
            expect(user).toBeNull();
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.user.findUnique.mockRejectedValue(new Error(errorMessage));
            const user = yield (0, user_1.getUserByEmail)('test@gmail.com');
            expect(user).toBeNull();
        }));
    });
    describe('Get user by Id', () => {
        it('should return user with given id', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.findUnique.mockResolvedValue(mock_data_1.mockUser);
            const user = yield (0, user_1.getUserById)(1);
            expect(user).toBe(mock_data_1.mockUser);
        }));
        it('should return null if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.findUnique.mockResolvedValue(null);
            const user = yield (0, user_1.getUserById)(1);
            expect(user).toBeNull();
        }));
        it('should retun null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.user.findUnique.mockRejectedValue(new Error(errorMessage));
            const user = yield (0, user_1.getUserById)(1);
            expect(user).toBeNull();
        }));
    });
    describe('Create User', () => {
        it('should create and return user', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.default.user.create.mockResolvedValue(mock_data_1.mockUser);
            const user = yield (0, user_1.createUser)(mock_data_1.createUserInputMock);
            expect(user).toBe(mock_data_1.mockUser);
        }));
        it('should return null if it failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Database error';
            prisma_1.default.user.create.mockRejectedValue(new Error(errorMessage));
            const user = yield (0, user_1.createUser)(mock_data_1.createUserInputMock);
            expect(user).toBeNull();
        }));
    });
});
