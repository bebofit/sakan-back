import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Property, IProperty } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class PropertyRepository extends MainRepository<IProperty> {
  constructor(protected model: Model<IProperty>) {
    super(model);
  }

  create(body: any): Promise<IProperty> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IProperty[]> {
    return super.find({}, options);
  }

  findById(id: string): Promise<IProperty> {
    return super.findById(id);
  }

  findByIdAndUpdate(id: string, body: IProperty): Promise<IProperty> {
    return super.findByIdAndUpdate(id, body);
  }

  softDeleteById(id: string): Promise<boolean> {
    return super.softDeleteById(id);
  }

}

export default new PropertyRepository(Property);
