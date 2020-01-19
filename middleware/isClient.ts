import { IMiddleware } from "../Interfaces/IMiddleware";
import UnauthorizedException from "../exception/UnauthorizedException";


class IsClient implements IMiddleware {

    async handle(request: any, response: any, next: any): Promise<any> {
        let user = request.user;
        if(user.userType !== 'client'){
            throw new UnauthorizedException('User must be a client');
        }
        next();
    }
}

export default new IsClient().handle;