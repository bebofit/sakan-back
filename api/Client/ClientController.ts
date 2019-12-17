import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import * as clientsValidations from './ClientValidations';
import * as userValidations from '../User/UserValidations';
import clientService from './ClientService';
import validation from '../Utils/Validation';
import Codes = require('../Constants/Codes');
import Messages = require('../Constants/Messages');
import ConflictException from '../../exception/ConflictException';
import Http from '../Utils/Http';
import NotFoundException from '../../exception/NotFoundException';

class ClientController {

  constructor() {
  }

  async createClient(request: IRequest, response: Response): Promise<any> {
    let client;
    try {
      //validating json object
      let body = validation.validateBody(request.body, clientsValidations.CREATE);
      body = validation.validateBody(request.body, userValidations.CREATE);
      //creating the new client
      //N.B: password not hashed, no verification token (for admin actions)
      client = await clientService.create(body);
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
    return Http.sendResponse(response, httpStatus.CREATED, client, "Client Created Successfully");
  }

  async getAllClients(request: IRequest, response: Response): Promise<any> {
    let clients = await clientService.getAllClients();
    //sending response
    return Http.sendResponse(response, httpStatus.OK, clients, "Clients Found");
  }

  async getClient(request: IRequest, response: Response): Promise<any> {
    let client = await clientService.getClient(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, client, "Client Found");
  }

  async updateClient(request: IRequest, response: Response): Promise<any> {
    let client;
    //validating json object
    let body = validation.validateBody(request.body, clientsValidations.UPDATE);
    body = validation.validateBody(request.body, userValidations.UPDATE);
    //update client
    client = await clientService.updateClient(request.params.id, body);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, client, "Client Data Updated Successfully");
  }

  async deleteClient(request: IRequest, response: Response): Promise<any> {
    let client = await clientService.deleteClient(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, client, "Client Deleted Successfully");
  }
}

export default new ClientController();