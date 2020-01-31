import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { QueryParams } from '../../Interfaces';
import { Admin, IAdmin } from '../../database/models/Admin';

class AdminRepository extends MainRepository<IAdmin> {
  constructor(protected model: Model<IAdmin>) {
    super(model);
  }
}

export default new AdminRepository(Admin);
