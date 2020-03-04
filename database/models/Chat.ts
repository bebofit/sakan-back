import { Document, model, Schema } from "mongoose";
// @ts-ignore

interface IChat extends Document {
  _id: string;
  messages: [IMessage];
  userOne: string;
  userTwo: string;
  type: string;
  isDeleted?: boolean;
}

interface IMessage extends Document {
  sender: string;
  receiver: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const chatSchema = new Schema(
  {
    userTwo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    userOne: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    type: {
      type: String,
      enum: ["chat"],
      default: "chat"
    },
    messages: [
      {
        type: new Schema(
          {
            sender: {
              type: Schema.Types.ObjectId,
              ref: "User"
            },
            receiver: {
              type: Schema.Types.ObjectId,
              ref: "User"
            },
            content: String
          },
          {
            timestamps: true
          }
        ),
        required: true
      }
    ],
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    discriminatorKey: "type",
    collection: "admins"
  }
);

chatSchema.index({
  userOne: 1,
  userTwo: 1
});

const Chat = model<IChat>("chat", chatSchema);

export { Chat, IChat, IMessage };
