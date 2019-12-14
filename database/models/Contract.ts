import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface IContract extends Document {
  _id: string;
  contractType: string;
  duration: Number;
  property: string;
  owner: string;
  client: string;
  invoice: string[];
}

interface Iinvoice extends Document {
  _id: string;
  invoicNumber: number;
  dueDate: Date;
  isPaid: boolean;
  value: number;
  penaltyValue: number;
}

const invoiceSchema = new Schema({
  invoiceNumber: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  value: {
    type: Number,
    required: true
  },
  penaltyValue: {
    type: Number,
    default: 0
  }
})

const contractSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    contractType: {
      type: String,
      enum: ['buy', 'rent'],
      required: true
    },
    duration: {
      type: Number,
      required: true,
      default: 365
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    invoice: [invoiceSchema]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'contracts'
  }
);

contractSchema.plugin(mongooseLeanVirtuals);

contractSchema.index({
  contractType: 'text'
});

const Contract = model<IContract>('Contract', contractSchema);

export { Contract, IContract, Iinvoice };
