import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface IProperty extends Document {
  _id: string;
  propType: string;
  address: object;
  title: string;
  description?: string;
  bedroomNum: number;
  bathroomNum: number;
  owner: string;
  unitArea: number;
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
      enum: ['client', 'investor']
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    birthDate: {
      type: Date
    },
    governmentId: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    profileStatus: {
      type: Number,
      default: 0
    },
    profilePic: {
      type: String
    },
    resetPasswordToken: {
      type: String,
      default: null
    },
    verificationToken: {
      type: String,
      default: null
    },
    wallet: {
      value: {
        type: Number,
        required: true,
        default: 0
      },
      currency: {
        type: String,
        default: 'EGP'
      }
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
  firstName: 'text',
  lastName: 'text',
  email: 'text',
  password: 'text',
  userType: 'text',
  phoneNumber: 'text',
  gender: 'text',
  birthDate: 'date',
  governmentId: 'text',
  isVerified: 'text',
  isDeleted: 'text',
  profileStatus: 'number',
  profilePic: 'text',
  resetPasswordToken: 'text',
  verificationToken: 'text',
  wallet: 'object'

});

const Property = model<IProperty>('Property', propertySchema);

export { Property, IProperty };
