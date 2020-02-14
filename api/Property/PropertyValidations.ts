import joi from "../../lib/joi";
import { PropType } from "../../enums";

const CREATE = joi.object({
  propType: joi
    .string()
    .trim()
    .valid(...Object.values(PropType))
    .required(),
  address: joi.object({
    street: joi.string().required(),
    city: joi.string().required(),
    country: joi.string()
  }),
  description: joi
    .string()
    .required()
    .max(200),
  bedroomNum: joi.number().required(),
  bathroomNum: joi.number().required(),
  owner: (joi as any).objectId().required(),
  unitArea: joi.number().required(),
  rentValue: joi.number().positive(),
  buyValue: joi.number().positive(),
  geospace: joi.string(),
  photos: joi.array().items(joi.string())
});

const UPDATE = joi.object({
  propType: joi
    .string()
    .trim()
    .valid(...Object.values(PropType)),
  address: joi.object({
    street: joi.string().required(),
    city: joi.string().required(),
    country: joi.string()
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
  rentValue: joi.number().positive(),
  buyValue: joi.number().positive(),
  geospace: joi.string(),
  photos: joi.array().items(joi.string())
});

// fields
// [street, city, bedroomNum, bathroomNum, propType, unitArea, rentValue, buyValue]
const FILTER = joi.object({
  street: joi.string(),
  city: joi.string(),
  bedroomNum: joi.number(),
  bathroomNum: joi.number(),
  propType: joi
    .string()
    .trim()
    .valid(...Object.values(PropType)),
  unitAreaMin: joi
    .number()
    .default(0)
    .less(joi.ref("unitAreaMax")),
  unitAreaMax: joi.number().default(Number.MAX_VALUE),
  rentValueMin: joi
    .number()
    .default(0)
    .less(joi.ref("rentValueMax")),
  rentValueMax: joi.number().default(Number.MAX_VALUE)
});

export { CREATE, UPDATE, FILTER };
