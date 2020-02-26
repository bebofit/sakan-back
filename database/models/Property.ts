import { Document, model, Schema } from "mongoose";
// @ts-ignore
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { PropType } from "../../enums";

interface IProperty extends Document {
  _id: string;
  propType: string;
  address: object;
  currentContract?: string;
  description?: string;
  bedroomNum: number;
  bathroomNum: number;
  owner: string;
  unitArea: string;
  rentValue: number;
  buyValue: number;
  geospace?: string;
  photos?: string[];
  isApproved: boolean;
  isDeleted?: boolean;
  deletedAt?: Date;
  reservation?: {
    isReserved: boolean;
    reservedBy?: string;
    reservedAt?: Date;
  };
}

const propertySchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    propType: {
      type: String,
      required: true,
      enum: Object.values(PropType)
    },
    currentContract: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      required: false
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
        default: "Egypt"
      }
    },
    description: {
      type: String,
      default: null
    },
    bedroomNum: {
      type: Number,
      required: true,
      default: 0
    },
    bathroomNum: {
      type: Number,
      required: true,
      default: 0
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      // unique: true, //implies that an investor can only have one property
      ref: "Investor"
    },
    unitArea: {
      type: Number,
      required: true
    },
    rentValue: {
      type: Number,
      required: function() {
        return this.buyValue === null;
      } // Only required if buyValue equals null
    },
    buyValue: {
      type: Number,
      required: function() {
        return this.rentValue === null;
      } // Only required if rentValue equals null
    },
    geospace: {
      type: String,
      default: null
    },
    photos: [
      {
        type: String,
        default: null
      }
    ],
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
    },
    reservation: {
      isReserved: {
        type: Boolean,
        default: false
      },
      reservedBy: {
        type: Schema.Types.ObjectId,
        unique: true,
        sparse: true,
        ref: "Client"
      },
      reservedAt: {
        type: Date
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: "properties"
  }
);

propertySchema.plugin(mongooseLeanVirtuals);

propertySchema.index({
  address: "object"
});

const Property = model<IProperty>("Property", propertySchema);

export { Property, IProperty };
