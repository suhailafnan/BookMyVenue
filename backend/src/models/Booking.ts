import mongoose, { Schema } from "mongoose";
import { IBooking } from "../types";

const bookingSchema = new Schema<IBooking>(
  {
    venue: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
      required: [true, "A booking must reference a venue."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A booking must reference an authenticated user."],
    },
    startDate: {
      type: Date,
      required: [true, "A booking must have a starting date."],
    },
    endDate: {
      type: Date,
      required: [true, "A booking must have an ending date."],
    },
    totalPrice: {
      type: Number,
      required: [true, "A booking must specify the total calculated price."],
      min: [0, "Total price cannot be negative."],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster lookups
bookingSchema.index({ venue: 1, startDate: 1, endDate: 1 });
bookingSchema.index({ user: 1 });
bookingSchema.index({ status: 1 });

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
