import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { User, IUser } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class UserRepository extends MainRepository<IUser> {
  constructor(protected model: Model<IUser>) {
    super(model);
  }

  create(body: any): Promise<IUser> {
    console.log('create user model');
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IUser[]> {
    return super.find({}, options);
  }
}

export default new UserRepository(User);
