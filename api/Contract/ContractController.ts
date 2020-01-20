import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import * as contractValidations from './ContractValidations';
import contractService from './ContractService';
import validation from '../Utils/Validation';
import Codes = require('../Constants/Codes');
import Messages = require('../Constants/Messages');
import ConflictException from '../../exception/ConflictException';
import Http from '../Utils/Http';


class ContractController {

  constructor() {
  }

  async createContract(request: IRequest, response: Response): Promise<any> {
    let contract;
    try{
      //validating json object
      const body = validation.validateBody(request.body, contractValidations.CREATE);
      //creating the new contract
      contract = await contractService.createContract(body);
    } catch (error) {
      // if (Number(error.code) === Number(Codes.Error.Database.uniqueViolation)) {
      //   throw new ConflictException(Messages.user.error.addressUnique);
      // }
      throw error;
    }
    //sending response
    return Http.sendResponse(response, httpStatus.CREATED, contract, "Contract Created Successfully");
  }

  async getAllContracts(request: IRequest, response: Response): Promise<any> {
    let contracts = await contractService.getAllContracts();
    //sending response
    return Http.sendResponse(response, httpStatus.OK, contracts, "Contracts Found");
  }

  async getContract(request: IRequest, response: Response): Promise<any> {
    let contract = await contractService.getContract(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, contract, "Contract Found");
  }

  async updateContract(request: IRequest, response: Response): Promise<any> {
    let contract;
    //validating json object
    let body = validation.validateBody(request.body, contractValidations.UPDATE);
    //update contract
    contract = await contractService.updateContract(request.params.id, body);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, contract, "Contract Updated Successfully");
  }

  async deleteContract(request: IRequest, response: Response): Promise<any> {
    let contract = await contractService.deleteContract(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, contract, "Contract Deleted Successfully");
  }
}

export default new ContractController();