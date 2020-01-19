import joi from '../../lib/joi';

const CREATE = joi.object({
  contractType: joi
    .string()
    .required()
    .valid('buy', 'rent'),
  duration: joi
    .number()
    .positive(),
  propertyId: (joi as any)
    .objectId()
    .required(),
  ownerId: (joi as any)
    .objectId()
    .required(),
  clientId: (joi as any)
    .objectId()
    .required(),
  invoice: joi
    .object({
      invoiceNumber: joi
        .number()
        .positive()
        .required(),
      dueDate: joi
        .date()
        .required(),
      isPaid: joi
        .boolean()
        .required(),
      value: joi
        .number()
        .positive()
        .required(),
      penaltyValue: joi
        .number()
        .positive()
    }),
});

const UPDATE = joi.object({
  contractType: joi
    .string()
    .required()
    .valid('buy', 'rent'),
  duration: joi
    .number()
    .positive(),
  invoice: joi
    .object({
      invoiceNumber: joi
        .number()
        .positive()
        .required(),
      dueDate: joi
        .date()
        .required(),
      isPaid: joi
        .boolean()
        .required(),
      value: joi
        .number()
        .positive()
        .required(),
      penaltyValue: joi
        .number()
        .positive()
    }),
});

export { CREATE, UPDATE };
