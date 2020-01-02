import { IClient } from '../../database/models';
import repository from './ClientRepository';
import NotFoundException from '../../exception/NotFoundException';

class ClientService {

  constructor(){}

  async create(body: IClient): Promise<IClient> {
    return await repository.create(body);
  }

  async getAllClients(): Promise<IClient[]> {
    let clients = await repository.findAll();
    if(clients.length === 0){
      throw new NotFoundException("No Clients Found");
    }
    return clients;
  }

  async getClient(id: string): Promise<IClient> {
    let client = await repository.findById(id);
    if(!client){
      throw new NotFoundException("Client not found");
    }
    return client;
  }

  async updateClient(id: string, body: IClient): Promise<IClient> {
    let client = await repository.findByIdAndUpdate(id, body);
    if(!client){
      throw new NotFoundException("Client not found");
    }
    return client;
  }

  async deleteClient(id: string): Promise<boolean> {
    let isDeleted = await repository.softDeleteById(id);
    if(!isDeleted){
      throw new NotFoundException("Client not found");
    }
    await repository.findByIdAndUpdate(id, { isDeleted: true });
    return isDeleted;
  }
}

export default new ClientService();
