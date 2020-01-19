import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import * as propertysValidations from './PropertyValidations';
import propertyService from './PropertyService';
import validation from '../Utils/Validation';
import Codes = require('../Constants/Codes');
import Messages = require('../Constants/Messages');
import ConflictException from '../../exception/ConflictException';
import Http from '../Utils/Http';
import Email from '../Utils/Mail';

class PropertyController {
  constructor() {
  }

  async createProperty(request: IRequest, response: Response): Promise<any> {
    let property;
    try {
      //validating json object
      let body = validation.validateBody(request.body, propertysValidations.CREATE);
      //creating the new property
      property = await propertyService.createProperty(body);
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
    return Http.sendResponse(response, httpStatus.CREATED, property, "Property Created Successfully");
  }

  async getAllProperties(request: IRequest, response: Response): Promise<any> {
    let properties = await propertyService.getAllProperties();
    //sending response
    return Http.sendResponse(response, httpStatus.OK, properties, "Properties Found");
  }

  async getProperty(request: IRequest, response: Response): Promise<any> {
    let properties = await propertyService.getProperty(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, properties, "Property Found");
  }

  async updateProperty(request: IRequest, response: Response): Promise<any> {
    let property;
    //validating json object
    let body = validation.validateBody(request.body, propertysValidations.UPDATE);
    //update Property
    property = await propertyService.updateProperty(request.params.id, body);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, property, "Property Data Updated Successfully");
  }

  async deleteProperty(request: IRequest, response: Response): Promise<any> {
    let property = await propertyService.deleteProperty(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, property, "Property Deleted Successfully");
  }

  async reserve(request: IRequest, response: Response): Promise<any>{
    //trying out mail
    await (new Email(['youssef.nabil.mustafa@gmail.com'], 'test email', 'hello world')).sendEmail();
    response.send('ok');
  }

  async getByFilter(request: IRequest, response: Response): Promise<any>{
    
  }
}

export default new PropertyController();