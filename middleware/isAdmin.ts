import { IMiddleware } from "../Interfaces/IMiddleware";


class IsAdmin implements IMiddleware{

    async handle(request: any, response: any, next: any): Promise<any> {

    }
}

export default new IsAdmin().handle;