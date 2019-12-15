import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface IRentBuyRequest extends Document {
  _id: string;
  reqType: string;
  ownerId: string;
  clientId: string;
  propertyId: string;
  isApproved: boolean;
}

const rentBuyRequestSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    reqType: {
      type: String,
      required: true,
      enum: ['buy', 'rent']
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required:true,
      ref: 'User'
    },
    clientId: {
      type: Schema.Types.ObjectId,
      required:true,
      ref: 'User'
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      required:true,
      ref: 'Property'
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'rentbuyrequests'
  }
);

rentBuyRequestSchema.plugin(mongooseLeanVirtuals);

rentBuyRequestSchema.index({
});

const RentBuyRequest = model<IRentBuyRequest>('RentBuyRequest', rentBuyRequestSchema);

export { RentBuyRequest, IRentBuyRequest };
