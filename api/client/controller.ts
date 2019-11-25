import { Response } from 'express';
import { CREATED } from 'http-status';
import { IRequest } from '../../Interfaces';

import * as clientsService from './service';
import * as clientsValidations from './validations';
import joi from '../../lib/joi';

async function createClient(req: IRequest, res: Response): Promise<any> {
  const body = validateBody(req.body, clientsValidations.CREATE);
  const client = await clientsService.createClient(body);
  res.status(CREATED).json({
    data: client
  });
}

function validateBody(body: any, schema: joi.Schema): any {
  const { error: errors, value } = schema.validate(body, {
    stripUnknown: true
  });
  if (errors) {
    console.log('hena');

    throw {
      errors,
      type: 'REQUEST_BODY',
      validationError: true
    };
  }
  return value;
}

export { createClient };
