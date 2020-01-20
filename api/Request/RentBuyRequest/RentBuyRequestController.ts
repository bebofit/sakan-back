import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../../Interfaces';
import * as rentbuyReqValidations from './RentBuyRequestValidations';
import rentbuyReqService from './RentBuyRequestService';
import validation from '../../Utils/Validation';
import Codes = require('../../Constants/Codes');
import Messages = require('../../Constants/Messages');
import ConflictException from '../../../exception/ConflictException';
import Http from '../../Utils/Http';

class RentBuyRequestController{
  constructor() {
  }

  async createRentBuyRequest(request: IRequest, response: Response): Promise<any> {
    let rentBuyReq;
    try {
      //validating json object
      const body = validation.validateBody(request.body, rentbuyReqValidations.CREATE);
      Object.assign(body, {clientId: request.user.id});
      //creating the new add request
      rentBuyReq = await rentbuyReqService.createRequest(body);
    } catch (error) {
      // if (Number(error.code) === Number(Codes.Error.Database.uniqueViolation)) {
      //   throw new ConflictException(Messages.user.error);
      // }
      throw error;
    }
    //sending response
    return Http.sendResponse(response, httpStatus.CREATED, rentBuyReq, "Rent/Buy Property Request Created Successfully");
  }

  async getAllRentBuyRequests(request: IRequest, response: Response): Promise<any> {
    let  rentBuyReqs = await rentbuyReqService.getAllRequests();
    //sending response
    return Http.sendResponse(response, httpStatus.OK, rentBuyReqs, "Rent/Buy Property Requests Found");
  }

  async getRentBuyRequest(request: IRequest, response: Response): Promise<any> {
    let rentBuyReq = await rentbuyReqService.getRequest(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, rentBuyReq, "Rent/Buy Property Request Found");
  }

  async updateRentBuyRequest(request: IRequest, response: Response): Promise<any> {
    let rentBuyReq;
    //validating json object
    let body = validation.validateBody(request.body, rentbuyReqValidations.UPDATE);
    //update client
    rentBuyReq = await rentbuyReqService.updateRequest(request.params.id, body);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, rentBuyReq, "Rent/Buy Property Request Updated Successfully");
  }

  async deleteRentBuyRequest(request: IRequest, response: Response): Promise<any> {
    let rentBuyReq = await rentbuyReqService.deleteRequest(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, rentBuyReq, "Rent/Buy Property Request Deleted Successfully");
  }
}
export default new RentBuyRequestController();