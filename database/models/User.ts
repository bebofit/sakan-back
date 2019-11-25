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
      required: true
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
