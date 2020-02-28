import { Document, model, Schema } from "mongoose";
// @ts-ignore

interface IMessage extends Document {
  _id: string;
  content: string;
  sender: string;
  receiver: string;
  type: string;
  isDeleted?: boolean;
}

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    type: {
      type: String,
      enum: ["chat"],
      default: "chat"
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    discriminatorKey: "type",
    collection: "messages"
  }
);

messageSchema.index({
  sender: 1,
  receiver: 1
});

const Message = model<IMessage>("Message", messageSchema);

export { Message, IMessage };
