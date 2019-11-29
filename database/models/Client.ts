import { Schema, Document } from 'mongoose';
// @ts-ignore
import { User, IUser } from './User';

const { ObjectId } = Schema.Types;

interface IClient extends IUser {
  favorites?: string[];
}

const clientSchema = new Schema({
  favorites: [
    {
      type: ObjectId,
      ref: 'Property'
    }
  ]
});

// tslint:disable-next-line: variable-name
const Client = User.discriminator<IClient>('Client', clientSchema);

export { Client, IClient };
