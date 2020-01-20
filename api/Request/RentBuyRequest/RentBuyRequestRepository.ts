import { Model } from 'mongoose';
import { MainRepository } from '../../../database/MainRepo';
import { RentBuyRequest, IRentBuyRequest } from '../../../database/models';
import { QueryParams } from '../../../Interfaces';

class IRentBuyRequestRepository extends MainRepository<IRentBuyRequest> {
  constructor(protected model: Model<IRentBuyRequest>) {
    super(model);
  }

  create(body: any): Promise<IRentBuyRequest> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IRentBuyRequest[]> {
    return super.find({}, options);
  }

  findById(id: string): Promise<IRentBuyRequest> {
    return super.findById(id);
  }

  findByIdAndUpdate(id: string, update: any): Promise<IRentBuyRequest> {
    return super.findByIdAndUpdate(id, update);
  }

  softDeleteById(id: string): Promise<boolean> {
    return super.softDeleteById(id);
  }

}

export default new IRentBuyRequestRepository(RentBuyRequest);
