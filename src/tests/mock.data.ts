import { Product, User } from "../services/prisma";
import { createUserInput } from '../services/user'
import { createProductInput } from '../services/product'

export const mockUser: User = {
    id: 1,
    name: 'test',
    email: 'test@gmail.com',
    isAdmin: false,
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const mockProduct: Product = {
    id: 1,
    name: 'test',
    description: 'test',
    price: 20,
    tags: 'string',
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const createUserInputMock: createUserInput = {
    name: mockUser.name,
    email: mockUser.email,
    password: mockUser.password,
};

export const createProductInputMock: createProductInput = {
    name: mockUser.name,
    description: mockProduct.description,
    price: mockProduct.price,
    tags: mockProduct.tags,
};