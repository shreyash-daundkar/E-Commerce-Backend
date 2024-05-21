export enum ErrorCode {

    // Bad Request
    USER_ALREADY_EXIST = 1001,
    INCORRECT_PASSWORD = 1003,

    // Not Found
    USER_NOT_FOUND = 2001,
    PRODUCT_NOT_FOUND = 2002,
    CART_ITEM_NOT_FOUND = 2003,

    // Internal
    INTERNAL_EXCEPTION = 3001,

    // Unprocessable
    UNPROCESSABLEENTITY = 4001,

    // Unauthorized
    TOKEN_NOT_FOUND = 5001,
    TOKEN_INVAID = 5002,
    WRONG_TOKEN = 5003,
    NO_ADMIN_ACCESS = 5004,
}