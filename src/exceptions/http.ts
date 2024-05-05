export class HttpException extends Error {

    errorCode: ErrorCode;
    error: any;
    statusCode: number;

    constructor(message: string, errorCode: ErrorCode, error: any, statusCode: number) {
        super(message);
        this.errorCode = errorCode;
        this.error = error;
        this.statusCode = statusCode;
    };
}

export class BadRequestException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, error: any) {
        super(message, errorCode, error, 400);
    };
}

export enum ErrorCode {
    USER_ALREADY_EXIST = 1001,
    USER_NOT_FOUND = 1002,
    INCORRECT_PASSWORD = 1003,
}

