import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Client, IClient } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class ClientRepository extends MainRepository<IClient> {
  constructor(protected model: Model<IClient>) {
    super(model);
  }
}

export default new ClientRepository(Client);
