import { Response } from "express";

export default class Exception extends Error{
    constructor(message: string,statusCode: number , response?: Response){
        super(message);
        if(response) response.status(statusCode).send({
            data: null,
            message: message || super.message
        });
    }
}
