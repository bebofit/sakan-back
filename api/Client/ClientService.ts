import { IClient } from '../../database/models';
import repository from './ClientRepository';

class ClientService {

  constructor(){}

  async createClient(body: IClient): Promise<IClient> {
    return repository.create(body);
  }

  async getAllClients(): Promise<IClient[]> {
    return repository.findAll();
  }

  async getClient(id: string): Promise<IClient> {
    return repository.findById(id);
  }

  async updateClient(id: string, body: IClient): Promise<IClient> {
    return repository.findByIdAndUpdate(id, body);
  }

  async deleteClient(id: string): Promise<boolean> {
    return repository.softDeleteById(id);
  }
}

export default new ClientService();
