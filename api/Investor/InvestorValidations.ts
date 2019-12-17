import joi from '../../lib/joi';

const CREATE = joi.object({
  ownedProps: joi
  .array()
  .items((joi as any).objectId())
});

const UPDATE = joi.object({
  ownedProps: joi
  .array()
  .items((joi as any).objectId())
});

export { CREATE, UPDATE };
