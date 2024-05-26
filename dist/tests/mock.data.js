"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderInputMock = exports.createOrderInputMock = exports.createCartItemInputMock = exports.createProductInputMock = exports.createUserInputMock = exports.mockOrder = exports.mockCartItemWithProduct = exports.mockCartItem = exports.mockProduct = exports.mockUser = void 0;
exports.mockUser = {
    id: 1,
    name: 'test',
    email: 'test@gmail.com',
    isAdmin: false,
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.mockProduct = {
    id: 1,
    name: 'test',
    description: 'test',
    price: 20,
    tags: 'string',
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.mockCartItem = {
    id: 1,
    userId: 1,
    productId: 1,
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.mockCartItemWithProduct = {
    id: 1,
    userId: 1,
    productId: 1,
    quantity: 1,
    product: {
        id: 1,
        name: 'test',
        description: 'test',
        price: 20,
        tags: 'string',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.mockOrder = {
    id: 1,
    userId: 1,
    amount: 20,
    isActive: true,
    isComplete: false,
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.createUserInputMock = {
    name: exports.mockUser.name,
    email: exports.mockUser.email,
    password: exports.mockUser.password,
};
exports.createProductInputMock = {
    name: exports.mockUser.name,
    description: exports.mockProduct.description,
    price: exports.mockProduct.price,
    tags: exports.mockProduct.tags,
};
exports.createCartItemInputMock = {
    userId: exports.mockCartItem.userId,
    productId: exports.mockCartItem.productId,
    quantity: exports.mockCartItem.quantity,
};
exports.createOrderInputMock = {
    userId: exports.mockOrder.userId,
    amount: exports.mockOrder.amount,
    products: [{
            productId: 1,
            quantity: 1,
        }],
};
exports.updateOrderInputMock = {
    id: 1,
    isActive: false,
};
