import { IMiddleware } from "../Interfaces/IMiddleware";
import UnauthorizedException from "../exception/UnauthorizedException";

class IsInvestor implements IMiddleware{

    async handle(request: any, response: any, next: any): Promise<any> {
        let user = request.user;
        if(user.userType !== 'investor'){
            throw new UnauthorizedException('User must be a client', response);
        }
        next();
    }
}

export default new IsInvestor().handle;