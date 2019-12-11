import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { ObjectId } from 'bson';

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
      unit: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      district: {
        type: String,
        default: null
      },
      city: {
        type: String,
        required: true
      },
      region: {
        type: String,
        default: null
      },
      country: {
        type: String,
        required: true
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
      type: ObjectId,
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
      type: String,
      required: function() { return this.rentValue === null; } // Only required if rentValue equals null
    },
    geospace: {
      type: String,
      default: null
    },
    photos: {
      type: String,
      default: null
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false
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
  propType: 'text',
  address: 'object',
  title: 'text',
  description: 'text',
  bedroomNum: 'text',
  bathroomNum: 'text',
  owner: 'text',
  unitArea: 'text',
  rentValue: 'number',
  buyValue: 'number',
  geospace: 'text',
  photos: 'text',
  isApproved: 'boolean'
});

const Property = model<IProperty>('Property', propertySchema);

export { Property, IProperty };
