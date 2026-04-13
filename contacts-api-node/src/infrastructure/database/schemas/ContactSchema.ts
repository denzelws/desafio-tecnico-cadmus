import mongoose, { Schema, Document } from "mongoose";

export interface IContactDocument extends Document {
  name: string;
  birthDate: Date;
  gender: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContactDocument>({
  name: { type: String, required: true, maxlength: 150 },
  birthDate: { type: Date, required: true },
  gender: { type: Number, required: true, enum: [1, 2, 3] },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

ContactSchema.index({ isActive: 1 });

export const ContactModel = mongoose.model<IContactDocument>("Contact", ContactSchema);
