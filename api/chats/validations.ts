import joi from '../../lib/joi';

const MESSAGE = joi.object({
  content: joi
    .string()
    .trim()
    .required(),
  receiver: (joi as any).objectId().required()
});

export { MESSAGE };
