import { Response } from 'express';
import { CREATED } from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import * as investorService from './InvestorService';
import * as investorValidations from './InvestorValidations';

async function createInvestor(req: IRequest, res: Response): Promise<any> {
  // const body = validateBody(req.body, investorValidations.CREATE);
  const investor = await investorService.createInvestor(req.body);
  res.status(CREATED).json({
    data: investor
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

export { createInvestor };
