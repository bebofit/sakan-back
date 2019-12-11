
export interface IMiddleware {
    handle(request: any, response: any, nextFunction: any): void
};
