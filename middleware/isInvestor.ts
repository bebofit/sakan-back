import { IMiddleware } from "../Interfaces/IMiddleware";


class IsInvestor implements IMiddleware{

    async handle(request: any, response: any, next: any): Promise<any> {

    }
}

export default new IsInvestor().handle;