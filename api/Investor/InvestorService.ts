import { IInvestor } from '../../database/models';
import repository from './InvestorRepository';
import NotFoundException from '../../exception/NotFoundException';

class InvestorService {

  constructor(){}

  async create(body: IInvestor): Promise<IInvestor> {
    return await repository.create(body);
  }

  async getAllInvestors(): Promise<IInvestor[]> {
    let investors = await repository.findAll();
    if(investors.length === 0){
      throw new NotFoundException("No Investors Found");
    }
    return investors;
  }

  async getInvestor(id: string): Promise<IInvestor> {
    let investor = await repository.findById(id);
    if(!investor){
      throw new NotFoundException("Investor not found");
    }
    return investor;
  }

  async updateInvestor(id: string, body: IInvestor): Promise<IInvestor> {
    let investor = await repository.findByIdAndUpdate(id, body);
    if(!investor){
      throw new NotFoundException("Investor not found");
    }
    return investor;
  }

  async deleteInvestor(id: string): Promise<boolean> {
    let isDeleted = await repository.softDeleteById(id);
    if(!isDeleted){
      throw new NotFoundException("Investor not found");
    }
    await repository.findByIdAndUpdate(id, { isDeleted: true });
    return isDeleted;
  }
}

export default new InvestorService();
