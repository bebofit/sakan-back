import joi from '../../lib/joi';

const CREATE = joi.object({
  propType: joi
    .string()
    .required()
    .valid('apartment', 'duplex', 'penthouse', 'villa', 'townhouse'),
  address: joi
    .object({
      unit: joi
        .string()
        .required(),
      street: joi
        .string()
        .required(),
      district: joi
        .string(),
      city: joi
        .string()
        .required(),
      region: joi
        .string(),
      country: joi
        .string()
        .required()
    }),
  title: joi
    .string()
    .required()
    .max(20),
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
    .objectId()
    .required(),
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
    .items(joi.string())
});

const UPDATE = joi.object({
  propType: joi
    .string()
    .required()
    .valid('apartment', 'duplex', 'penthouse', 'villa', 'townhouse'),
  address: joi
    .object({
      unit: joi
        .string()
        .required(),
      street: joi
        .string()
        .required(),
      district: joi
        .string(),
      city: joi
        .string()
        .required(),
      region: joi
        .string(),
      country: joi
        .string()
        .required()
    }),
  title: joi
    .string()
    .required()
    .max(20),
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
    .items(joi.string())
});

export { CREATE, UPDATE };
