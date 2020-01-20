
import { NOT_FOUND } from 'http-status';
import Exception from './base/Exception';
import { Response } from 'express';

export default class NotFoundException extends Exception{
    
    constructor(message: string, response?: Response) {
        super(message, NOT_FOUND, response);
        this.name = "NotFoundException";
    }
}