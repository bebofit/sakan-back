import joi from '../../../lib/joi';

const CREATE = joi.object({
  propType: joi
    .string()
    .required()
    .valid('apartment', 'duplex', 'penthouse', 'villa', 'townhouse'),
  address: joi
    .object({
      street: joi
        .string()
        .trim()
        .lowercase()
        .required(),
      city: joi
        .string()
        .required(),
      country: joi
        .string()
    }),
  description: joi
    .string()
    .required()
    .max(200),
  bedroomNum: joi
    .string()
    .required()
    .regex(/^[0-9]*$/),
  bathroomNum: joi
    .string()
    .required()
    .regex(/^[0-9]*$/),
  owner: (joi as any)
    .objectId(),
  unitArea: joi
    .string()
    .required()
    .max(5)
    .regex(/^[0-9]*$/),
  rentValue: joi
    .number()
    .positive(),
  buyValue: joi
    .number()
    .positive(),
  geospace: joi
    .string(),
  photos: joi
    .array()
    .items(joi.string()),
  isApproved: joi
    .boolean(),
  status: joi
    .string()
    .valid('rejected', 'pending approval'),
});

const UPDATE = joi.object({
  propType: joi
    .string()
    .valid('apartment', 'duplex', 'penthouse', 'villa', 'townhouse'),
  address: joi
    .object({
      street: joi
        .string()
        .trim()
        .lowercase(),
      city: joi
        .string(),
      country: joi
        .string()
    }),
  description: joi
    .string()
    .max(200),
  bedroomNum: joi
    .string()
    .regex(/^[0-9]*$/),
  bathroomNum: joi
    .string()
    .regex(/^[0-9]*$/),
  unitArea: joi
    .string()
    .max(5)
    .regex(/^[0-9]*$/),
  rentValue: joi
    .number()
    .positive(),
  buyValue: joi
    .number()
    .positive(),
  geospace: joi
    .string(),
  photos: joi
    .array()
    .items(joi.string()),
  isApproved: joi
    .boolean(),
  status: joi
    .string()
    .valid('rejected', 'pending approval')
});

export { CREATE, UPDATE };
