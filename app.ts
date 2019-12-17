import cors from 'cors';
import express, { NextFunction, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from 'http-status';
import logger from 'morgan';
import routes from './api';
import { IRequest } from './Interfaces';
require('dotenv').config();

const app = express();
//configure app
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  cors({
    origin: '*'
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/api', routes);

app.use((err: any, req: IRequest, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  if (err.validationError) {
    console.log('validation error', err.errors.details[0].message);
    return res.status(UNPROCESSABLE_ENTITY).json({
      data: null,
      message: err.errors.details[0].message.replace(/"/g, '') || err.message || err
    });
  }
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    data: null,
    message: err.message || err
  });
});

export default app;
