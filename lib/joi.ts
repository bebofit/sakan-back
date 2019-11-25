import joi from '@hapi/joi';
// @ts-ignore
import joiObjectId from 'joi-objectid';

(joi as any).objectId = joiObjectId(joi);

export default joi;
