import { IMiddleware } from '../Interfaces/IMiddleware';
import UnauthorizedException from '../exception/UnauthorizedException';
import Helpers from '../api/Utils/Helpers';

class IsAuthenticated implements IMiddleware {
  async handle(request: any, response: any, next: any): Promise<any> {
    const token = Helpers.extractToken(request.headers.authorization);
    try {
      const decoded = await Helpers.verifyToken(token);
      request.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Wrong Credentials', response);
    }
  }
}

export default new IsAuthenticated().handle;
