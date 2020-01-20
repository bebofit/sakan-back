
import { UNAUTHORIZED } from 'http-status';
import { Response } from 'express';
import Exception from './base/Exception';

export default class UnauthorizedException extends Exception{
    
    constructor(message: string, response?: Response) {
        super(message, UNAUTHORIZED, response);
        this.name = "UnauthorizedException";
    }
}