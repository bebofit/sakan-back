import { IUser } from '../../database/models';
import clientRepository from '../Client/ClientRepository';
import investorRepository from '../Investor/InvestorRepository';

class UserService {

  async createUser(body: IUser): Promise<IUser> {
    let newUser;
    //check if user is client or investor
    switch (body.userType) {
      case 'client': {
        newUser = clientRepository.create(body);
        break;
      }
      case 'investor': {
        newUser = investorRepository.create(body);
        break;
      }
      default: {
        break;
      }
    }
    return newUser;
  }
}

export default new UserService();