import { IUser } from '../../database/models';
import repository from './UserRepository';

const createUser = (body: IUser): Promise<IUser> =>
  repository.create(body);

export { createUser };
