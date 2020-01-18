import { IMiddleware } from "../Interfaces/IMiddleware";


class IsClient implements IMiddleware{

    async handle(request: any, response: any, next: any): Promise<any> {

    }
}

export default new IsClient().handle;