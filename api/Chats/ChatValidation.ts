import joi from "../../lib/joi";

const CREATE = joi.object({
  content: joi
    .string()
    .trim()
    .required(),
  sender: (joi as any).objectId().required(),
  receiver: (joi as any).objectId().required()
});

const UPDATE = joi.object({
  content: joi.string().trim(),
  sender: (joi as any).objectId(),
  receiver: (joi as any).objectId()
});

export { CREATE, UPDATE };
