import joi from '@hapi/joi';

// import joiObjectId from 'joi-objectid';
(joi as any).objectId = require('joi-objectid')(joi)


// (joi as any).objectId = joiObjectId(joi);

export default joi;
