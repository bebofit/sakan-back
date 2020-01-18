import { IMiddleware } from "../Interfaces/IMiddleware";


class IsGuest implements IMiddleware{

    async handle(request: any, response: any, next: any): Promise<any> {

    }
}

export default new IsGuest().handle;