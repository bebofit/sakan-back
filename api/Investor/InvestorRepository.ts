import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Investor, IInvestor } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class InvestorRepository extends MainRepository<IInvestor> {
  constructor(protected model: Model<IInvestor>) {
    super(model);
  }

  create(body: any): Promise<IInvestor> {
    console.log('create investor model');
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IInvestor[]> {
    return super.find({}, options);
  }
}

export default new InvestorRepository(Investor);
