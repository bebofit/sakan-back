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
  console.log('qaz');

  if (process.env.NODE_ENV !== 'production') {
    console.log('env error');
    
    console.error(err);
  }
  if (err.validationError) {
    console.log('validation error');
    
    return res.status(UNPROCESSABLE_ENTITY).json(err);
  }
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  res.sendStatus(statusCode);
});

export default app;
