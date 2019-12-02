import { IInvestor } from '../../database/models';
import repository from './InvestorRepository';

class InvestorService {

  constructor(){}

  async createInvestor(body: IInvestor): Promise<IInvestor> {
    return repository.create(body);
  }

  async getAllInvestors(): Promise<IInvestor[]> {
    return repository.findAll();
  }

  async getInvestor(id: string): Promise<IInvestor> {
    return repository.findById(id);
  }

  async updateInvestor(id: string, body: IInvestor): Promise<IInvestor> {
    return repository.findByIdAndUpdate(id, body);
  }

  async deleteInvestor(id: string): Promise<boolean> {
    return repository.softDeleteById(id);
  }
}

export default new InvestorService();
