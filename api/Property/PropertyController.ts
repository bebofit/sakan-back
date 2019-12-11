import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import * as propertyValidations from './PropertyValidations';
import * as userValidations from '../User/UserValidations';
import propertyService from './PropertyService';
import validation from '../Utils/Validation';

class PropertyController {

  constructor() {
  }

  async createProperty(req: IRequest, res: Response): Promise<any> {
    console.log('Creating Property...');
    let body = validation.validateBody(req.body, propertyValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    const property = await propertyService.createProperty(body);
    res.status(httpStatus.CREATED).json({
      data: property,
      message: "Property Created Successfully"
    });
  }

  async getAllProperties(req: IRequest, res: Response): Promise<any> {
    let properties = await propertyService.getAllProperties();
    res.status(httpStatus.OK).json({
      data: properties,
      message: "Properties Found"
    });
  }

  async getProperty(req: IRequest, res: Response): Promise<any> {
    let property = await propertyService.getProperty(req.params.id);
    res.status(httpStatus.OK).json({
      data: property,
      message: "Property Found"
    });
  }

  async updateProperty(req: IRequest, res: Response): Promise<any> {
    let body = validation.validateBody(req.body, propertyValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    let property = await propertyService.updateProperty(req.params.id, body);
    res.status(httpStatus.OK).json({
      data: property,
      message: "Property Data Updated Successfully"
    });
  }

  async deleteProperty(req: IRequest, res: Response): Promise<any> {
    let property = await propertyService.deleteProperty(req.params.id);
    res.status(httpStatus.OK).json({
      data: property,
      message: "Property Deleted Successfully"
    });
  }
}

export default new PropertyController();