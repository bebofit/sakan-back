import { IMiddleware } from "../Interfaces/IMiddleware";
import UnauthorizedException from "../exception/UnauthorizedException";


class IsAdmin implements IMiddleware{

    async handle(request: any, response: any, next: any): Promise<any> {
        let user = request.user;
        if(user.type !== 'admin' && user.type !== 'superAdmin'){
            throw new UnauthorizedException('You don\'t have administrative privileges', response);
        }
        next();
    }
}

export default new IsAdmin().handle;