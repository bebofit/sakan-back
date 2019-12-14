
import { UNAUTHORIZED } from 'http-status';

export default class UnauthorizedException extends Error{
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedException";
        this.statusCode = UNAUTHORIZED;
    }
}