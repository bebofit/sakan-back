import { BAD_REQUEST } from 'http-status';
import Exception from './base/Exception';
import { Response } from 'express';

export default class CustomException extends Exception{
    
    constructor(message: string, statusCode: number, response?: Response) {
        super(message, statusCode | BAD_REQUEST, response);
        this.name = "CustomException";
    }
}