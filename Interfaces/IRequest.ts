import { Request } from 'express';
import { IUser } from '../database/models';

export interface IRequest extends Request {
  token?: {
    userId: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
  };
  user?: IUser;
}
