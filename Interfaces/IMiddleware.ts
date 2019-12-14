
export interface IMiddleware {
    handle(request: any, response: any, next: any): void
};
