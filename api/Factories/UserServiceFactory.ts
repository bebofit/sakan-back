import clientService from '../Client/ClientService';
import investorService from '../Investor/InvestorService';

class UserServiceFactory {

    obj: any  = {
        'client' : clientService,
        'investor': investorService
    };

    constructor() {}

    getInstance(userType: string): any{
        return this.obj[userType];
    }
}

export default new UserServiceFactory();