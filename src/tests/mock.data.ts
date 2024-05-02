import { User } from "../services/prisma";
import { createUserInput } from '../services/user'

export const mockUser: User = {
    id: 1,
    name: 'test',
    email: 'test@gmail.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const createUserInputMock: createUserInput = {
    name: mockUser.name,
    email: mockUser.email,
    password: mockUser.password,
};