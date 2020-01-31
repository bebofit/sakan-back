import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { UserType } from '../../enums';

interface IUser extends Document {
  _id: string;
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender?: string;
  birthDate?: Date;
  governmentId?: string;
  isVerified: boolean;
  isDeleted?: boolean;
  deletedAt?: Date;
  profileStatus: number;
  profilePic?: string;
  resetPasswordToken?: string;
  verificationToken?: string;
  wallet: object;
}

const userSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    userType: {
      type: String,
      enum: Object.values(UserType)
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
      default: null
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
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
    discriminatorKey: 'type',
    collection: 'users'
  }
);

userSchema.plugin(mongooseLeanVirtuals);

userSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text'
});

const User = model<IUser>('User', userSchema);

export { User, IUser };
