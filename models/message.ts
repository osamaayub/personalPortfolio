import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    name: { type: String, default: "", trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    // Salted hash of the sender IP, used only for rate limiting.
    ipHash: { type: String, index: true },
    read: { type: Boolean, default: false },
    emailed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type MessageDoc = InferSchemaType<typeof messageSchema>;

export const MessageModel: Model<MessageDoc> =
  (mongoose.models.Message as Model<MessageDoc>) ||
  mongoose.model<MessageDoc>("Message", messageSchema);
