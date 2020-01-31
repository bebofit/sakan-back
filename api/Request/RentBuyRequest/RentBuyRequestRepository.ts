import { Model } from 'mongoose';
import { MainRepository } from '../../../database/MainRepo';
import { RentBuyRequest, IRentBuyRequest } from '../../../database/models';
import { QueryParams } from '../../../Interfaces';

class IRentBuyRequestRepository extends MainRepository<IRentBuyRequest> {
  constructor(protected model: Model<IRentBuyRequest>) {
    super(model);
  }
}

export default new IRentBuyRequestRepository(RentBuyRequest);
