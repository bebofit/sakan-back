import { IContract } from '../../database/models';
import repository from './ContractRepository';
import NotFoundException from '../../exception/NotFoundException';


class ContractService {

  constructor(){}

  async createContract(body: IContract): Promise<IContract> {
    return await repository.create(body);
  }

  async getAllContracts(): Promise<IContract[]> {
    let contract = await repository.findAll();
    if(contract.length === 0){
      throw new NotFoundException("No Contracts Found");
    }
    return contract;
  }

  async getContract(id: string): Promise<IContract> {
    let contract = await repository.findById(id);
    if(!contract){
      throw new NotFoundException("Contract not found");
    }
    return contract;
  }

  async updateContract(id: string, body: IContract): Promise<IContract> {
    let contract = await repository.findByIdAndUpdate(id, body);
    if(!contract){
      throw new NotFoundException("Contract not found");
    }
    return contract;
  }

  async deleteContract(id: string): Promise<boolean> {
    let isDeleted = await repository.softDeleteById(id);
    if(!isDeleted){
      throw new NotFoundException("Contract not found");
    }
    await repository.findByIdAndUpdate(id, { isDeleted: true });
    return isDeleted;
  }
}

export default new ContractService();
