import { Model } from 'mongoose';
import { MainRepository } from '../../../database/MainRepo';
import {
  AddPropertyRequest,
  IAddPropertyRequest
} from '../../../database/models';
import { QueryParams } from '../../../Interfaces';

class IAddPropertyRequestRepository extends MainRepository<
  IAddPropertyRequest
> {
  constructor(protected model: Model<IAddPropertyRequest>) {
    super(model);
  }
}

export default new IAddPropertyRequestRepository(AddPropertyRequest);
