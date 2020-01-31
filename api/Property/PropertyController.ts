import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import * as propertyValidations from './PropertyValidations';
import propertyService from './PropertyService';
import validation from '../Utils/Validation';
import Codes = require('../Constants/Codes');
import Messages = require('../Constants/Messages');
import ConflictException from '../../exception/ConflictException';
import Http from '../Utils/Http';
import Email from '../Utils/Mail';

class PropertyController {
  constructor() {}

  async createProperty(request: IRequest, response: Response): Promise<any> {
    let property;
    try {
      //validating json object
      let body = validation.validateBody(
        request.body,
        propertyValidations.CREATE
      );
      //creating the new property
      property = await propertyService.createProperty(body);
    } catch (error) {
      if (Number(error.code) === Number(Codes.Error.Database.uniqueViolation)) {
        throw new ConflictException(error);
        // if (!error.keyPattern.email) {
        //   throw new ConflictException(Messages.user.error.phoneUnique);
        // }
        // throw new ConflictException(Messages.user.error.emailUnique);
      }
      throw error;
    }
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.CREATED,
      property,
      'Property Created Successfully'
    );
  }

  async getAllProperties(request: IRequest, response: Response): Promise<any> {
    let properties = await propertyService.getAllProperties();
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.OK,
      properties,
      'Properties Found'
    );
  }

  async getProperty(request: IRequest, response: Response): Promise<any> {
    let properties = await propertyService.getProperty(request.params.id);
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.OK,
      properties,
      'Property Found'
    );
  }

  async updateProperty(request: IRequest, response: Response): Promise<any> {
    let property;
    //validating json object
    let body = validation.validateBody(
      request.body,
      propertyValidations.UPDATE
    );
    //update Property
    property = await propertyService.updateProperty(request.params.id, body);
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.OK,
      property,
      'Property Data Updated Successfully'
    );
  }

  async deleteProperty(request: IRequest, response: Response): Promise<any> {
    let property = await propertyService.deleteProperty(request.params.id);
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.OK,
      property,
      'Property Deleted Successfully'
    );
  }

  // filters that applies:
  // [address: {street, city}, bedroomNum, bathroomNum, propType, unitArea, rentValue, buyValue]
  async getByFilter(request: IRequest, response: Response): Promise<any> {
    validation.validateBody(request.body, propertyValidations.FILTER);
    let result = await propertyService.getByFilter(request.body);
    return Http.sendResponse(response, httpStatus.OK, result, 'Properties');
  }
}

export default new PropertyController();
