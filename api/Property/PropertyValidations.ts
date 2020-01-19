import joi from '../../lib/joi';

const CREATE = joi.object({
  propType: joi
    .string()
    .required()
    .valid('apartment', 'duplex', 'penthouse', 'villa', 'townhouse'),
  address: joi
    .object({
      street: joi
        .string()
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
      street: joi
        .string()
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

// fields
// [street, city, bedroomNum, bathroomNum, propType, unitArea, rentValue, buyValue]
const FILTER = joi.object({
  street: joi.string(),
  city: joi.string(),
  bedroomNum: joi.number(),
  bathroomNum: joi.number(),
  propType: joi.string().valid('apartment', 'duplex', 'penthouse', 'villa', 'townhouse'),
  unitArea: joi.number(),
  rentValue: joi.number(),
  buyValue: joi.number()
});

export { CREATE, UPDATE, FILTER };
