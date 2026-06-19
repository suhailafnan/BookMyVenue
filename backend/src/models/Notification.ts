import mongoose, { Schema } from "mongoose";
import { INotification } from "../types";

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A notification must have a recipient user."],
    },
    title: {
      type: String,
      required: [true, "A notification must have a title."],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "A notification must possess body content."],
      trim: true,
    },
    type: {
      type: String,
      enum: ["booking", "payment", "info"],
      default: "info",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

export const Notification = mongoose.model<INotification>("Notification", notificationSchema);
