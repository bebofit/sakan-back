import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface IProperty extends Document {
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
  isApproved: boolean;
  isDeleted?: boolean;
  deletedAt?: Date;
}

const propertySchema = new Schema(
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
      unique: true,
      ref: 'Investor'
    },
    unitArea: {
      type: String,
      required: true
    },
    rentValue: {
      type: Number,
      required: function () { return this.buyValue === null; } // Only required if buyValue equals null
    },
    buyValue: {
      type: Number,
      required: function () { return this.rentValue === null; } // Only required if rentValue equals null
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
      required: true,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'properties'
  }
);

propertySchema.plugin(mongooseLeanVirtuals);

propertySchema.index({
  address: 'object',
  title: 'text',
});

const Property = model<IProperty>('Property', propertySchema);

export { Property, IProperty };
