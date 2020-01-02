import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Investor, IInvestor } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class InvestorRepository extends MainRepository<IInvestor> {
  constructor(protected model: Model<IInvestor>) {
    super(model);
  }

  create(body: any): Promise<IInvestor> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IInvestor[]> {
    return super.find({}, options);
  }

  findById(id: string): Promise<IInvestor> {
    return super.findById(id);
  }

  findByIdAndUpdate(id: string, update: any): Promise<IInvestor> {
    return super.findByIdAndUpdate(id, update);
  }

  softDeleteById(id: string): Promise<boolean> {
    return super.softDeleteById(id);
  }


}

export default new InvestorRepository(Investor);
