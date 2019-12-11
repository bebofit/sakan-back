import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface IContract extends Document {
  _id: string;
  property: string;
  dueDate: Date;
  value: number;
  penaltyValue: number;
  isPaid: boolean;
}

const contractSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    property: {
      type: String,
      ref: 'Contract'
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
    collection: 'contracts'
  }
);

contractSchema.plugin(mongooseLeanVirtuals);

contractSchema.index({
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

const Contract = model<IContract>('Contract', contractSchema);

export { Contract, IContract };
