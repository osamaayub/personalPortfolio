import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    tags: { type: [String], default: [] },
    image: { type: String, default: "", trim: true },
    url: { type: String, default: "", trim: true },
    github: { type: String, default: "", trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type ProjectDoc = InferSchemaType<typeof projectSchema>;

export const ProjectModel: Model<ProjectDoc> =
  (mongoose.models.Project as Model<ProjectDoc>) ||
  mongoose.model<ProjectDoc>("Project", projectSchema);
