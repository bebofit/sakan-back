import { IClient } from '../../database/models';
import repository from './ClientRepository';

const createClient = (body: IClient): Promise<IClient> =>
  repository.create(body);

export { createClient };
