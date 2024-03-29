import Validation from "../Utils/Validation";
import { IRequest } from "../../Interfaces";
import { Response } from "express";
import Http from "../Utils/Http";
import AdminService from "./AdminService";
import * as adminValidations from "./AdminValidations";
import httpStatus = require("http-status");

class AdminController {
  constructor() {}

  async login(request: IRequest, response: Response): Promise<any> {
    //validate email and password
    Validation.validateBody(request.body, adminValidations.LOGIN);
    let token = await AdminService.login(
      request.body.email.toLowerCase(),
      request.body.password
    );
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.OK,
      token,
      "Login Successful"
    );
  }

  async respondToRentRequest(
    request: IRequest,
    response: Response
  ): Promise<any> {
    const body = Validation.validateBody(
      request.body,
      adminValidations.RENTREQ
    );
    await AdminService.respondToRentRequest(
      body.rentReqId,
      request.body.status
    );
    return Http.sendResponse(
      response,
      httpStatus.OK,
      null,
      request.body.status
    );
  }

  async respondToAddRequest(
    request: IRequest,
    response: Response
  ): Promise<any> {
    const body = Validation.validateBody(request.body, adminValidations.ADDREQ);
    await AdminService.respondToAddRequest(body.addReqId, request.body.status);
    return Http.sendResponse(
      response,
      httpStatus.OK,
      null,
      request.body.status
    );
  }

  async getPropertyRequests(request: IRequest, response: Response): Promise<any> {
    const data = await AdminService.getPropertyRequests(request.body.status);
    return Http.sendResponse(response, httpStatus.OK, data, "Add Property Requests");
  }

  async getRentBuyRequests(request: IRequest, response: Response): Promise<any> {
    const data = await AdminService.getRentBuyRequests(request.body.status, request.body.reqType);
    return Http.sendResponse(response, httpStatus.OK, data, "Rent/Buy Requests");
  }
}

export default new AdminController();
