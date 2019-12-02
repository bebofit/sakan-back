import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Client, IClient } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class ClientRepository extends MainRepository<IClient> {
  constructor(protected model: Model<IClient>) {
    super(model);
  }

  create(body: any): Promise<IClient> {
    console.log('create client model');
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IClient[]> {
    return super.find({}, options);
  }
}

export default new ClientRepository(Client);
