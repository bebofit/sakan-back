import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import * as clientsValidations from './ClientValidations';
import * as userValidations from '../User/UserValidations';
import clientService from './ClientService';
import validation from '../Utils/Validation';

class ClientController {

  constructor() {
  }

  async createClient(req: IRequest, res: Response): Promise<any> {
    console.log('Creating Client...');
    let body = validation.validateBody(req.body, clientsValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    const client = await clientService.createClient(body);
    res.status(httpStatus.CREATED).json({
      data: client,
      message: "Client Created Successfully"
    });
  }

  async getAllClients(req: IRequest, res: Response): Promise<any> {
    let clients = await clientService.getAllClients();
    res.status(httpStatus.OK).json({
      data: clients,
      message: "Clients Found"
    });
  }

  async getClient(req: IRequest, res: Response): Promise<any> {
    let client = await clientService.getClient(req.params.id);
    res.status(httpStatus.OK).json({
      data: client,
      message: "Client Found"
    });
  }

  async updateClient(req: IRequest, res: Response): Promise<any> {
    let body = validation.validateBody(req.body, clientsValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    let client = await clientService.updateClient(req.params.id, body);
    res.status(httpStatus.OK).json({
      data: client,
      message: "Client Data Updated Successfully"
    });
  }

  async deleteClient(req: IRequest, res: Response): Promise<any> {
    let client = await clientService.deleteClient(req.params.id);
    res.status(httpStatus.OK).json({
      data: client,
      message: "Client Deleted Successfully"
    });
  }
}

export default new ClientController();