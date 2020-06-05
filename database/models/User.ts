import { Document, model, Schema } from "mongoose";
// @ts-ignore
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { UserType } from "../../enums";
import { IChat } from ".";

interface IFileUpload {
  type: string;
  size: number;
  path: string;
  url: string;
}

interface IUser extends Document {
  _id: string;
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  chatList: IChat[];
  gender?: string;
  birthDate?: Date;
  governmentId?: string;
  isVerified: boolean;
  isDeleted?: boolean;
  deletedAt?: Date;
  profileStatus: number;
  photo: IFileUpload;
  resetPasswordToken?: string;
  verificationToken?: string;
  wallet: object;
}

const fileUploadSchema = new Schema(
  {
    type: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    url: { type: String, required: true }
  },
  { _id: false, id: false }
);

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
      enum: ["male", "female"]
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
    photo: {
      type: fileUploadSchema,
      default: () => ({
        type: "Image",
        size: "18",
        path: "misc/default-profile.png",
        url:
          "https://test-21222.s3.us-east-2.amazonaws.com/misc/default-profile.png"
      })
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
        default: "EGP"
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    discriminatorKey: "type",
    collection: "users"
  }
);

userSchema.plugin(mongooseLeanVirtuals);

userSchema.index({
  firstName: "text",
  lastName: "text",
  email: "text"
});

const User = model<IUser>("User", userSchema);

export { User, IUser };
