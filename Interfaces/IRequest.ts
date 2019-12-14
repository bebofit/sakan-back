import { Request } from 'express';

export interface IRequest extends Request {
  token?: {
    userId: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
  };
  user?: object;
}
