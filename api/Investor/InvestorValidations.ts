import joi from '../../lib/joi';

const CREATE = joi.object({
  ownedProps: joi
  .array()
  .items((joi as any).objectId())
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
