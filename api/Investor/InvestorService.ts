import { IInvestor } from '../../database/models';
import repository from './InvestorRepository';

const createInvestor = (body: IInvestor): Promise<IInvestor> =>
  repository.create(body);

export { createInvestor };
