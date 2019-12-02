import joi from '../../lib/joi';

const CREATE = joi.object({
  favProps: joi
  .array()
  .items((joi as any).objectId())
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
