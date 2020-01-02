import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Client, IClient } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class ClientRepository extends MainRepository<IClient> {
  constructor(protected model: Model<IClient>) {
    super(model);
  }

  create(body: any): Promise<IClient> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IClient[]> {
    return super.find({}, options);
  }

  findById(id: string): Promise<IClient> {
    return super.findById(id);
  }

  findByIdAndUpdate(id: string, update: any): Promise<IClient> {
    return super.findByIdAndUpdate(id, update);
  }

  softDeleteById(id: string): Promise<boolean> {
    return super.softDeleteById(id);
  }

}

export default new ClientRepository(Client);
