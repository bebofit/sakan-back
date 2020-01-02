'use strict';
export = {
    Error : {
        Database: {
            uniqueViolation : 11000,
            foreignKeyViolation: 23503
        },
        Http: {
            internalServerError : 500,
            badRequest: 400,
            forbidden: 403,
            notFound: 404,
            unauthorized: 401,
            conflict: 409
        }
    }
};