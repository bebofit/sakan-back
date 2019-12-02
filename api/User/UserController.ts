import { Response } from 'express';
import { CREATED } from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import * as userService from './UserService';
import * as userValidations from './UserValidations';

async function createUser(req: IRequest, res: Response): Promise<any> {
  console.log('Creating User...');  
  
  const body = validateBody(req.body, userValidations.CREATE);
  const user = await userService.createUser(body);
  res.status(CREATED).json({
    data: user
  });
}

function validateBody(body: any, schema: joi.Schema): any {
  const { error: errors, value } = schema.validate(body, {
    stripUnknown: true
  });
  if (errors) {
    console.log('validation errors henaa');

    throw {
      errors,
      type: 'REQUEST_BODY',
      validationError: true
    };
  }
  return value;
}

export { createUser };
