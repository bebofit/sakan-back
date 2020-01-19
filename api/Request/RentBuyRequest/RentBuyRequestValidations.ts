import joi from '../../../lib/joi';

const CREATE = joi.object({
  reqType: joi
    .string()
    .required()
    .valid('rent', 'buy'),
  propertyId: (joi as any)
    .objectId()
    .required(),
  ownerId: (joi as any)
    .objectId()
    .required(),
  clientId: (joi as any)
    .objectId()
    .required(),
  isApproved: joi
    .boolean(),
  status: joi
    .string()
    .valid('rejected', 'pending approval'),
});

const UPDATE = joi.object({
  reqType: joi
    .string()
    .required()
    .valid('rent', 'buy'),
  isApproved: joi
    .boolean(),
  status: joi
    .string()
    .valid('rejected', 'pending approval'),
});

export { CREATE, UPDATE };
