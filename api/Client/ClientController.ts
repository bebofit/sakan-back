import { Response } from 'express';
import { CREATED } from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import * as clientsService from './ClientService';
import * as clientsValidations from './ClientValidations';

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
