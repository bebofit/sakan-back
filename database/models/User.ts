import { Document, model, Schema } from 'mongoose';
// @ts-ignore
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    type: {
      type: String,
      enum : ['client', 'investor']
    },
    name: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      }
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
      enum : ['male', 'female']
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
      required: true,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: true,
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
      type: String
    },
    verificationToken:{
      type: String
    },
    wallet: {
      _id: Schema.Types.ObjectId,
      value: {
        type: Number,
        required: true,
        default: 0
      },
      currency: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    discriminatorKey: 'type'
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
