import { Schema, Document } from 'mongoose';
// @ts-ignore
import { User, IUser } from './User';

interface IInvestor extends IUser {
  ownedProps?: string[];
}

const investorSchema = new Schema({
  ownedProps: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    }
  ]
});

// tslint:disable-next-line: variable-name
const Investor = User.discriminator<IInvestor>('Investor', investorSchema);

export { Investor, IInvestor };
