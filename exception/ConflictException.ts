
import { CONFLICT } from 'http-status';
import Exception from './base/Exception';
import { Response } from 'express';

export default class ConflictException extends Exception{
    
    constructor(message: string, response?: Response) {
        super(message, CONFLICT, response);
        this.name = "ConflictException";
    }
}