import { Schema, Document } from 'mongoose';
// @ts-ignore
import { User, IUser } from './User';

const { ObjectId } = Schema.Types;

interface IInvestor extends IUser {
  ownedProps?: string[];
}

const investorSchema = new Schema({
  ownedProps: [
    {
      type: ObjectId,
      ref: 'Property'
    }
  ]
});

// tslint:disable-next-line: variable-name
const Investor = User.discriminator<IInvestor>('Investor', investorSchema);

export { Investor, IInvestor };
