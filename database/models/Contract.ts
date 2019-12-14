import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { ObjectId } from 'bson';

interface IContract extends Document {
  _id: string;
  contractType: string;
  duration: Number;
  property: string;
  owner: string;
  client: string;
  invoice: string[];
}

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
      type: ObjectId,
      ref: 'Property',
      required: true
    },
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    client: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    invoice: [
      {
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
    }
  ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'contracts'
  }
);

contractSchema.plugin(mongooseLeanVirtuals);

contractSchema.index({
  contractType: 'text',
  duration: 'number',
  property: 'text',
  owner: 'text',
  client: 'text',
  invoice: 'object'
});

const Contract = model<IContract>('Contract', contractSchema);

export { Contract, IContract };
