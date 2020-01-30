import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { QueryParams } from '../../Interfaces';
import { Admin, IAdmin } from '../../database/models/Admin';

class AdminRepository extends MainRepository<IAdmin> {
  constructor(protected model: Model<IAdmin>) {
    super(model);
  }

  create(body: any): Promise<IAdmin> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IAdmin[]> {
    return super.find({}, options);
  }

  findById(id: string): Promise<IAdmin> {
    return super.findById(id);
  }

  findByIdAndUpdate(id: string, update: any): Promise<IAdmin> {
    return super.findByIdAndUpdate(id, update);
  }

  softDeleteById(id: string): Promise<boolean> {
    return super.softDeleteById(id);
  }

  findOne(conditions: any, options: QueryParams = {}): Promise<IAdmin>{
    return super.findOne(conditions, options);
  }

}

export default new AdminRepository(Admin);
