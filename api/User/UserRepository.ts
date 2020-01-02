import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { User, IUser } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class UserRepository extends MainRepository<IUser> {
  constructor(protected model: Model<IUser>) {
    super(model);
  }

  create(body: any): Promise<IUser> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IUser[]> {
    return super.find({}, options);
  }

  findOne(query: object): Promise<any> {
    return super.findOne(query);
  }

  findByIdAndUpdate(id: string, update: any): Promise<IUser> {
    return super.findByIdAndUpdate(id, update);
  }
}

export default new UserRepository(User);
