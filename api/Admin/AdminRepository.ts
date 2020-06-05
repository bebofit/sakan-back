import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { IDBQueryOptions } from '../../Interfaces';
import { Admin, IAdmin } from '../../database/models/Admin';

class AdminRepository extends MainRepository<IAdmin> {
  constructor(protected model: Model<IAdmin>) {
    super(model);
  }

  findAddRequest(addReqId: any): Promise<any> {
    return super.findById(addReqId)
  }
}

export default new AdminRepository(Admin);
