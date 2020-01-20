import { NOT_ACCEPTABLE } from 'http-status';
import Exception from './base/Exception';
import { Response } from 'express';

export default class NotAcceptableException extends Exception{
    
    constructor(message: string, response?:Response) {
        super(message, NOT_ACCEPTABLE, response);
        this.name = "NotAcceptableException";
    }
}