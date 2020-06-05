import { Document, model, Schema } from "mongoose";
import { IUser } from "./User";

interface IMessage extends Document {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: string;
}

interface IChat extends Document {
  id: string;
  userOne: IUser;
  userTwo: IUser;
  isPrivate: boolean;
  createdAt: string;
  messages: IMessage[];
  deletedAt?: string;
}

const messageSchema = new Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true
    },
    read: { type: Boolean, default: false },
    content: {
      type: String,
      required: true
    },
    createdAt: { type: String, required: true },
    deletedAt: Date
  },
  {
    id: false,
    _id: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.deletedAt;
        delete ret.lock;
        delete ret.__v;
      }
    }
  }
);

const chatSchema = new Schema(
  {
    userOne: {
      id: { type: Schema.Types.ObjectId, ref: "AuthUser", required: true },
      name: { type: String, required: true },
      photoUrl: { type: String, required: true }
    },
    userTwo: {
      id: { type: Schema.Types.ObjectId, ref: "AuthUser", required: true },
      name: { type: String, required: true },
      photoUrl: { type: String, required: true }
    },
    isPrivate: {
      type: Boolean,
      default: true
    },
    messages: [{ type: messageSchema, required: true }],
    deletedAt: Date
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.deletedAt;
        delete ret.lock;
        delete ret.__v;
      }
    }
  }
);

// tslint:disable-next-line: variable-name
const Chat = model<IChat>("Chat", chatSchema);

export { Chat, IChat, IMessage };
