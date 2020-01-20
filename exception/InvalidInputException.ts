import { BAD_REQUEST } from 'http-status';
import Exception from './base/Exception';
import { Response } from 'express';

export default class InvalidInputException extends Exception{
    
    constructor(message: string, response?: Response) {
        super(message, BAD_REQUEST, response);
        this.name = "InvalidInputException";
    }
}