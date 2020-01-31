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


const RENTREQ = joi.object({
  rentReqId: joi.string().required(),
  status: joi.string().valid('accepted', 'rejected').required()
});

export { LOGIN, RENTREQ };