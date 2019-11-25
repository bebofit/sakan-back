import { Model } from 'mongoose';
// // import { BaseRepository } from '../../common/classes';
import { Client, IClient } from '../../database/models';
// // import { DBQueryOptions } from '../../common/types';

// class ClientRepository extends BaseRepository<IClient> {
//   constructor(protected model: Model<IClient>) {
//     super(model);
//   }

//   // findAll(options?: DBQueryOptions): Promise<IClient[]> {
//   //   return super.find({}, options);
//   // }

//   // countAll(options?: DBQueryOptions): Promise<number> {
//   //   return super.count({}, options);
//   // }
// }

// export default new ClientRepository(Client);

const create = (body: IClient): Promise<IClient> => Client.create(body);

export { create };
