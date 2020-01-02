import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import * as contractValidations from './ContractValidations';
import * as userValidations from '../User/UserValidations';
import contractService from './ContractService';
import validation from '../Utils/Validation';

class ContractController {

  constructor() {
  }

  async createContract(req: IRequest, res: Response): Promise<any> {
    console.log('Creating Contract...');
    let body = validation.validateBody(req.body, contractValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    const contract = await contractService.createContract(body);
    res.status(httpStatus.CREATED).json({
      data: contract,
      message: "Contract Created Successfully"
    });
  }

  async getAllContracts(req: IRequest, res: Response): Promise<any> {
    let contracts = await contractService.getAllContracts();
    res.status(httpStatus.OK).json({
      data: contracts,
      message: "Contracts Found"
    });
  }

  async getContract(req: IRequest, res: Response): Promise<any> {
    let contract = await contractService.getContract(req.params.id);
    res.status(httpStatus.OK).json({
      data: contract,
      message: "Contract Found"
    });
  }

  async updateContract(req: IRequest, res: Response): Promise<any> {
    let body = validation.validateBody(req.body, contractValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    let contract = await contractService.updateContract(req.params.id, body);
    res.status(httpStatus.OK).json({
      data: contract,
      message: "Contract Data Updated Successfully"
    });
  }

  async deleteContract(req: IRequest, res: Response): Promise<any> {
    let contract = await contractService.deleteContract(req.params.id);
    res.status(httpStatus.OK).json({
      data: contract,
      message: "Contract Deleted Successfully"
    });
  }
}

export default new ContractController();