import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Investor, IInvestor } from '../../database/models';
import { IDBQueryOptions } from '../../Interfaces';

class InvestorRepository extends MainRepository<IInvestor> {
  constructor(protected model: Model<IInvestor>) {
    super(model);
  }
}

export default new InvestorRepository(Investor);
