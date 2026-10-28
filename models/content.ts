import mongoose, { Model, Schema } from "mongoose";

// One document per section; `_id` is the section key (e.g. "profile").
type ContentDoc = { _id: string; data: unknown };

const contentSchema = new Schema<ContentDoc>(
  { _id: { type: String, required: true }, data: { type: Schema.Types.Mixed, required: true } },
  { timestamps: true },
);

export const ContentModel: Model<ContentDoc> =
  (mongoose.models.Content as Model<ContentDoc>) || mongoose.model<ContentDoc>("Content", contentSchema);
