import {IMiddleware} from "../Interfaces/IMiddleware";

class IsAuthenticated implements IMiddleware{

    handle(request: any, response: any, nextFunction: any): void {
        console.log('is auth is fired');
        nextFunction();
    }

}

export default new IsAuthenticated();