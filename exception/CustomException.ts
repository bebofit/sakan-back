import { BAD_REQUEST } from 'http-status';

export default class CustomException extends Error{
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "CustomException";
        this.statusCode = BAD_REQUEST;
    }
}