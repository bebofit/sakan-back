import joi from '../../lib/joi';

// example 
const CREATE = joi.object({
  favProps: joi
  .array()
  .items((joi as any).objectId())
});

export { CREATE };