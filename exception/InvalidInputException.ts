import { BAD_REQUEST } from 'http-status';

export default class InvalidInputException extends Error{
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "InvalidInputException";
        this.statusCode = BAD_REQUEST;
    }
}