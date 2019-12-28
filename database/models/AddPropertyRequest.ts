import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';


interface IAddPropertyRequest extends Document {
  _id: string;
  propType: string;
  address: object;
  title: string;
  description?: string;
  bedroomNum: string;
  bathroomNum: string;
  owner: string;
  unitArea: string;
  rentValue: number;
  buyValue: number;
  geospace?: string;
  photos?: string[];
  isDeleted?: boolean;
  deletedAt?: Date;
  isApproved: boolean;
}

const addPropertyRequestSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    propType: {
      type: String,
      required: true,
      enum: ['apartment', 'duplex', 'penthouse', 'villa', 'townhouse']
    },
    address: {
      street: {
        type: String,
        required: true,
        unique: true
      },
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        default: 'Egypt'
      }
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    bedroomNum: {
      type: String,
      required: true,
      default: '0'
    },
    bathroomNum: {
      type: String,
      required: true,
      default: '0'
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    unitArea: {
      type: String,
      required: true
    },
    rentValue: {
      type: Number,
      required: function() { return this.buyValue === null; } // Only required if buyValue equals null
    },
    buyValue: {
      type: Number,
      required: function() { return this.rentValue === null; } // Only required if rentValue equals null
    },
    geospace: {
      type: String,
      default: null
    },
    photos: [{
      type: String,
      default: null
    }],
    isApproved: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt:{
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'addpropertyrequests'
  }
);

addPropertyRequestSchema.plugin(mongooseLeanVirtuals);

addPropertyRequestSchema.index({
});

const AddPropertyRequest = model<IAddPropertyRequest>('AddPropertyRequest', addPropertyRequestSchema);

export { AddPropertyRequest, IAddPropertyRequest };
