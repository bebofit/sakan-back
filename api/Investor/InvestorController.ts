import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import * as investorValidations from './InvestorValidations';
import * as userValidations from '../User/UserValidations';
import investorService from './InvestorService';
import validation from '../Utils/Validation';

class InvestorContoller {

  constructor() {
  }

  async createInvestor(req: IRequest, res: Response): Promise<any> {
    console.log('Creating Investor...');
    let body = validation.validateBody(req.body, investorValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    const investor = await investorService.createInvestor(body);
    res.status(httpStatus.CREATED).json({
      data: investor,
      message: "Investor Created Successfully"
    });
  }

  async getAllInvestors(req: IRequest, res: Response): Promise<any> {
    let investors = await investorService.getAllInvestors();
    res.status(httpStatus.OK).json({
      data: investors,
      message: "Investors Found"
    });
  }

  async getInvestor(req: IRequest, res: Response): Promise<any> {
    let investor = await investorService.getInvestor(req.params.id);
    res.status(httpStatus.OK).json({
      data: investor,
      message: "Investor Found"
    });
  }

  async updateInvestor(req: IRequest, res: Response): Promise<any> {
    let body = validation.validateBody(req.body, investorValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    let investor = await investorService.updateInvestor(req.params.id, body);
    res.status(httpStatus.OK).json({
      data: investor,
      message: "Investor Data Updated Successfully"
    });
  }

  async deleteInvestor(req: IRequest, res: Response): Promise<any> {
    let investor = await investorService.deleteInvestor(req.params.id);
    res.status(httpStatus.OK).json({
      data: investor,
      message: "Investor Deleted Successfully"
    });
  }
}

export default new InvestorContoller();