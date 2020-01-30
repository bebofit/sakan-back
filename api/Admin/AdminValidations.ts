import joi from '../../lib/joi';

// example 
const LOGIN = joi.object({
  email: joi
    .string()
    .trim()
    .email()
    .required(),
  password: joi
    .string()
    .required()
    .min(8)
});

export { LOGIN };