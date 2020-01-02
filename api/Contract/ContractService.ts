import { IContract } from '../../database/models';
import repository from './ContractRepository';

class ContractService {

  constructor(){}

  async createContract(body: IContract): Promise<IContract> {
    return repository.create(body);
  }

  async getAllContracts(): Promise<IContract[]> {
    return repository.findAll();
  }

  async getContract(id: string): Promise<IContract> {
    return repository.findById(id);
  }

  async updateContract(id: string, body: IContract): Promise<IContract> {
    return repository.findByIdAndUpdate(id, body);
  }

  async deleteContract(id: string): Promise<boolean> {
    return repository.softDeleteById(id);
  }
}

export default new ContractService();
