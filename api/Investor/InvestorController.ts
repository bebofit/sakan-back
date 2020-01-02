import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import * as investorsValidations from './InvestorValidations';
import * as userValidations from '../User/UserValidations';
import investorService from './InvestorService';
import validation from '../Utils/Validation';
import Codes = require('../Constants/Codes');
import Messages = require('../Constants/Messages');
import ConflictException from '../../exception/ConflictException';
import Http from '../Utils/Http';
import NotFoundException from '../../exception/NotFoundException';

class InvestorController {

  constructor() {
  }

  async createInvestor(request: IRequest, response: Response): Promise<any> {
    let investor;
    try {
      //validating json object
      let body = validation.validateBody(request.body, investorsValidations.CREATE);
      body = validation.validateBody(request.body, userValidations.CREATE);
      //creating the new investor
      //N.B: password not hashed, no verification token (for admin actions)
      investor = await investorService.create(body);
    } catch (error) {
      if (Number(error.code) === Number(Codes.Error.Database.uniqueViolation)) {
        if (!error.keyPattern.email) {
          throw new ConflictException(Messages.user.error.phoneUnique);
        }
        throw new ConflictException(Messages.user.error.emailUnique);
      }
      throw error;
    }
    //sending response
    return Http.sendResponse(response, httpStatus.CREATED, investor, "Investor Created Successfully");
  }

  async getAllInvestors(request: IRequest, response: Response): Promise<any> {
    let investors = await investorService.getAllInvestors();
    //sending response
    return Http.sendResponse(response, httpStatus.OK, investors, "Investors Found");
  }

  async getInvestor(request: IRequest, response: Response): Promise<any> {
    let investor = await investorService.getInvestor(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, investor, "Investor Found");
  }

  async updateInvestor(request: IRequest, response: Response): Promise<any> {
    let investor;
    //validating json object
    let body = validation.validateBody(request.body, investorsValidations.UPDATE);
    body = validation.validateBody(request.body, userValidations.UPDATE);
    //update investor
    investor = await investorService.updateInvestor(request.params.id, body);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, investor, "Investor Data Updated Successfully");
  }

  async deleteInvestor(request: IRequest, response: Response): Promise<any> {
    let investor = await investorService.deleteInvestor(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, investor, "Investor Deleted Successfully");
  }
}

export default new InvestorController();