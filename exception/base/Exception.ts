import { Response } from "express";

export default class Exception extends Error{
    statusCode: Number;
    constructor(message: string,statusCode: number , response?: Response){
        super(message);
        this.statusCode = statusCode;
        if(response) response.status(statusCode).send({
            data: null,
            message: message || super.message
        });
    }
}
