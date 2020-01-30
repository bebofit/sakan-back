import { IMiddleware } from "../Interfaces/IMiddleware";
import UnauthorizedException from "../exception/UnauthorizedException";


class IsAdmin implements IMiddleware{

    async handle(request: any, response: any, next: any): Promise<any> {
        let user = request.user;
        if(user.type !== 'admin' && user.type !== 'superAdmin'){
            throw new UnauthorizedException('User must be a client', response);
        }
        next();
    }
}

export default new IsAdmin().handle;