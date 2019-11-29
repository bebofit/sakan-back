import { Schema, Document } from 'mongoose';
// @ts-ignore
import { User, IUser } from './user';

const { ObjectId } = Schema.Types;

interface IInvestor extends IUser, Document {
  favorites?: string[];
}

const investorSchema = new Schema({
  favorites: [
    {
      type: ObjectId,
      ref: 'Property'
    }
  ]
});

// tslint:disable-next-line: variable-name
const Investor = User.discriminator<IInvestor>('Investor', investorSchema);

export { Investor, IInvestor };
