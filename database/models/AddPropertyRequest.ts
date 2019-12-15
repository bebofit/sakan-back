import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface IAddPropertyRequest extends Document {
  _id: string;
  property: object;
  isApproved: boolean;
}

interface IPendingProperty extends Document {
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
}

const pendingPropertySchema = new Schema(
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
    }]
  }
);

const addPropertyRequestSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    property: pendingPropertySchema,
    isApproved: {
      type: Boolean,
      default: false
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

export { AddPropertyRequest, IAddPropertyRequest, IPendingProperty };
