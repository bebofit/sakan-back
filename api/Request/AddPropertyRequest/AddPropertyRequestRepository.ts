import { Model } from 'mongoose';
import { MainRepository } from '../../../database/MainRepo';
import { AddPropertyRequest, IAddPropertyRequest } from '../../../database/models';
import { QueryParams } from '../../../Interfaces';

class IAddPropertyRequestRepository extends MainRepository<IAddPropertyRequest> {
  constructor(protected model: Model<IAddPropertyRequest>) {
    super(model);
  }

  create(body: any): Promise<IAddPropertyRequest> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IAddPropertyRequest[]> {
    return super.find({}, options);
  }

  findById(id: string): Promise<IAddPropertyRequest> {
    return super.findById(id);
  }

  findByIdAndUpdate(id: string, update: any): Promise<IAddPropertyRequest> {
    return super.findByIdAndUpdate(id, update);
  }

  softDeleteById(id: string): Promise<boolean> {
    return super.softDeleteById(id);
  }

}

export default new IAddPropertyRequestRepository(AddPropertyRequest);
