import { IMiddleware } from "../Interfaces/IMiddleware";
import UnauthorizedException from "../exception/UnauthorizedException";
import { promises as fs } from "fs";
import path from "path";
import jwt from "jsonwebtoken";

class IsAuthenticated implements IMiddleware {

    async handle(request: any, response: any, next: any): Promise<any> {
        let token = request.headers['authorization'];
        if (!token){
            throw new UnauthorizedException('No token found, please login', response);
        }
        token = request.headers['authorization'].replace('Bearer', '').trim();
        try {
            let publicKey = await fs.readFile(path.join(__dirname, '../keys/jwtRS256.key.pub'));
            let decoded = await jwt.verify(token, publicKey);
            request.user = decoded;
            next();
        } catch (error) {
            throw new UnauthorizedException('Wrong Credentials', response);
        }
    }
}

export default new IsAuthenticated().handle;