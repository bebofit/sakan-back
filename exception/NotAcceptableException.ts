import { NOT_ACCEPTABLE } from 'http-status';

export default class NotAcceptableException extends Error{
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "NotAcceptableException";
        this.statusCode = NOT_ACCEPTABLE;
    }
}