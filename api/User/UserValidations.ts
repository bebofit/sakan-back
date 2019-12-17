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
    .required(),
  password: joi
    .string()
    .required()
    .min(8),
  userType: joi
    .string()
    .required()
    .valid('client', 'investor'),
  phoneNumber: joi
    .string()
    .required()
    .regex(/^[0-9]*$/)
    .min(11)
    .max(14),
  gender: joi
    .string()
    .valid('male', 'female'),
  birthDate: joi.date(),
  governmentId: joi
    .string()
    .max(14)
    .alphanum(),
  profileStatus: joi
    .number(),
  wallet: joi
    .object({
      value: joi
        .number()
        .positive()
        .required(),
      currency: joi
        .string()
    })
});

const UPDATE = joi.object({
  firstName: joi
    .string()
    .trim(),
  lastName: joi
    .string()
    .trim(),
  phoneNumber: joi
    .string()
    .regex(/^[0-9]*$/)
    .min(11)
    .max(14),
  gender: joi
    .string()
    .valid('male', 'female'),
  birthDate: joi.date(),
  governmentId: joi
    .string()
    .max(14)
    .alphanum(),
  profileStatus: joi
    .number(),
  wallet: joi
    .object({
      value: joi
        .number()
        .positive(),
      currency: joi
        .string()
    })
});

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

const EMAIL = joi.object({
  email: joi
    .string()
    .trim()
    .email()
    .required()
});

const RESETPW = joi.object({
  token: joi
    .string()
    .required(),
  password: joi
    .string()
    .required()
    .min(8)
});

const TOKEN = joi.object({
  token: joi
    .string()
    .required()
});

export { CREATE, UPDATE, LOGIN, EMAIL, RESETPW, TOKEN };
