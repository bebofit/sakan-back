import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../../Interfaces';
import * as addPropReqValidations from './AddPropertyRequestValidations';
import addPropReqService from './AddPropertyRequestService';
import validation from '../../Utils/Validation';
import Codes = require('../../Constants/Codes');
import Messages = require('../../Constants/Messages');
import ConflictException from '../../../exception/ConflictException';
import Http from '../../Utils/Http';

class AddPropertyRequestController {
  constructor() {
  }

  async createAddPropertyRequest(request: IRequest, response: Response): Promise<any> {
    let addPropReq;
    try {
      //validating json object
      const body = validation.validateBody(request.body, addPropReqValidations.CREATE);
      Object.assign(body, {owner: request.user.id});
      //creating the new add request
      addPropReq = await addPropReqService.createRequest(body);
    } catch (error) {
      if (Number(error.code) === Number(Codes.Error.Database.uniqueViolation)) {
        throw new ConflictException(Messages.user.error.addressUnique);
      }
      throw error;
    }
    //sending response
    return Http.sendResponse(response, httpStatus.CREATED, addPropReq, "Add Property Request Created Successfully");
  }

  async getAllAddPropertyRequests(request: IRequest, response: Response): Promise<any> {
    let  addPropReqs = await addPropReqService.getAllRequests();
    //sending response
    return Http.sendResponse(response, httpStatus.OK, addPropReqs, "Add Property Requests Found");
  }

  async getAddPropertyRequest(request: IRequest, response: Response): Promise<any> {
    let addPropReq = await addPropReqService.getRequest(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, addPropReq, "Add Property Request Found");
  }

  async updateAddPropertyRequest(request: IRequest, response: Response): Promise<any> {
    let addPropReq;
    //validating json object
    let body = validation.validateBody(request.body, addPropReqValidations.UPDATE);
    //update client
    addPropReq = await addPropReqService.updateRequest(request.params.id, body);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, addPropReq, "Add Property Request Updated Successfully");
  }

  async deleteAddPropertyRequest(request: IRequest, response: Response): Promise<any> {
    let addPropReq = await addPropReqService.deleteRequest(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, addPropReq, "Add Property Request Deleted Successfully");
  }
}
export default new AddPropertyRequestController();