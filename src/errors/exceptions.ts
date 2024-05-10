import { ErrorCode } from "./codes";

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

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, error: any) {
        super(message, errorCode, error, 404);
    };
}

export class InternalException extends HttpException {
    constructor(error: any) {
        super('Internal Exception', ErrorCode.INTERNAL_EXCEPTION, error, 500);
    };
}

export class UnprocessableEntityException extends HttpException {
    constructor(error: any) {
        super('Unprocessable Entity', ErrorCode.UNPROCESSABLEENTITY, error, 422);
    };
}

