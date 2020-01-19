import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Contract, IContract } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class ContractRepository extends MainRepository<IContract> {
  constructor(protected model: Model<IContract>) {
    super(model);
  }

  create(body: any): Promise<IContract> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IContract[]> {
    return super.find({}, options);
  }

  findById(id: string): Promise<IContract> {
    return super.findById(id);
  }

  findByIdAndUpdate(id: string, update: any): Promise<IContract> {
    return super.findByIdAndUpdate(id, update);
  }


  softDeleteById(id: string): Promise<boolean> {
    return super.softDeleteById(id);
  }


}

export default new ContractRepository(Contract);
