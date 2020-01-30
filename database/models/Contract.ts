import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface IContract extends Document {
  _id: string;
  contractType: string;
  status: string;
  duration: number;
  propertyId: string;
  ownerId: string;
  clientId: string;
  invoice: object[];
  isDeleted?: boolean;
  deletedAt?: Date;
}

const contractSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    contractType: {
      type: String,
      enum: ['buy', 'rent'],
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'closed'],
      required: true
    },
    duration: {
      type: Number,
      required: true,
      default: 365
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt:{
      type: Date
    },
    invoice: [{
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
    }]
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

export { Contract, IContract };
