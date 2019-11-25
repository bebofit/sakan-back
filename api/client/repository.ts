import { Model } from 'mongoose';
import { MainRepository } from '../../database/mainrepo';
import { Client, IClient } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class ClientRepository extends MainRepository<IClient> {
  constructor(protected model: Model<IClient>) {
    super(model);
  }

  findAll(options?: QueryParams): Promise<IClient[]> {
    return super.find({}, options);
  }
}

export default new ClientRepository(Client);
