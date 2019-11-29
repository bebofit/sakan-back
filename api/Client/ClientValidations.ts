import joi from '../../lib/joi';

const CREATE = joi.object({
  firstName: joi
    .string()
    .trim()
    .required(),
  lastName: joi
    .string()
    .trim()
    .required(),
  email: joi
    .string()
    .trim()
    .email()
    .lowercase()
    .required()
});

const UPDATE = joi.object({
  firstName: joi.string().trim(),
  lastName: joi.string().trim(),
  email: joi
    .string()
    .trim()
    .email()
    .lowercase()
});

export { CREATE, UPDATE };
