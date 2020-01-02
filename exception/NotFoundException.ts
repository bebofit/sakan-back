
import { NOT_FOUND } from 'http-status';

export default class NotFoundException extends Error{
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
        this.statusCode = NOT_FOUND;
    }
}