import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Contract, IContract } from '../../database/models';
import { IDBQueryOptions } from '../../Interfaces';

class ContractRepository extends MainRepository<IContract> {
  constructor(protected model: Model<IContract>) {
    super(model);
  }
}

export default new ContractRepository(Contract);
