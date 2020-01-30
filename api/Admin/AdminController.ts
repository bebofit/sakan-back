import Validation from "../Utils/Validation";
import { IRequest } from "../../Interfaces";
import { Response } from "express";
import Http from "../Utils/Http";
import AdminService from "./AdminService";
import * as adminValidations from './AdminValidations';
import httpStatus = require("http-status");

class AdminController {
    constructor(){}

    async login(request: IRequest, response: Response): Promise<any> {
        //validate email and password
        Validation.validateBody(request.body, adminValidations.LOGIN);
        let token = await AdminService.login(request.body.email.toLowerCase(), request.body.password);
        //sending response
        return Http.sendResponse(response, httpStatus.OK, token, "Login Successful");
    }
}

export default new AdminController();